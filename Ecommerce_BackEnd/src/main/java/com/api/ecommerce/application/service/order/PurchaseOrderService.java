package com.api.ecommerce.application.service.order;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.order.OrderAlreadyExistsException;
import com.api.ecommerce.application.exceptions.order.OrderNotFoundException;
import com.api.ecommerce.domain.model.order.PaymentOrderEntity;
import com.api.ecommerce.domain.model.order.PurchaseOrderEntity;
import com.api.ecommerce.domain.repository.order.IPurchaseOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseOrderService implements IPurchaseOrderService {

    @Autowired
    private IPurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private IPaymentOrderService paymentOrderService;

    @Override
    public List<PurchaseOrderEntity> findAllPurchaseOrders() {
        return (ArrayList<PurchaseOrderEntity>) purchaseOrderRepository.findAll();
    }

    @Override
    public Optional<PurchaseOrderEntity> findPurchaseOrderById(Long id) {
        if (purchaseOrderRepository.existsById(id)) {
            return purchaseOrderRepository.findById(id);
        }
        throw new OrderNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("La orden de pedido/compra que esta buscando no existe.")
                        .build()
        );
    }

    @Override
    public PurchaseOrderEntity savePurchaseOrder(PurchaseOrderEntity purchaseOrder) {
        Optional<PaymentOrderEntity> paymentOrder = paymentOrderService.findPaymentOrderById(purchaseOrder.getPaymentOrderId());
        if (paymentOrder.isEmpty()){
            throw new OrderNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("No existe una Orden de Pago para agregar una Orden de Pedido.")
                            .build()
            );
        } else {
            Optional<PurchaseOrderEntity> existingPurchase = purchaseOrderRepository.findByPaymentOrderId(purchaseOrder.getPaymentOrderId());
            if (existingPurchase.isPresent()){
                throw new OrderAlreadyExistsException(
                        ExceptionDetailsDTO.builder()
                                .statusCode(409)
                                .message("Ya existe una Orden de Pedido por el Pago #"+paymentOrder.get().getId()+".")
                                .build());
            }
            return purchaseOrderRepository.save(purchaseOrder);
        }
    }

    @Override
    public void deletePurchaseOrderById(Long id) {
        if (purchaseOrderRepository.existsById(id)) {
            purchaseOrderRepository.deleteById(id);
        } else {
            throw new OrderNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("La orden de pedido/compra ya no existe.")
                            .build()
            );
        }
    }

    @Override
    public Optional<PurchaseOrderEntity> updateState(Long id, String state) {
        Optional<PurchaseOrderEntity> purchaseOrder = purchaseOrderRepository.findById(id);
        if (purchaseOrder.isPresent()){
            PurchaseOrderEntity updatePurchaseOrder= purchaseOrder.get();
            updatePurchaseOrder.setState(state);
            return Optional.of(purchaseOrderRepository.save(updatePurchaseOrder));
        }
        throw new OrderNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("La orden de pedido/compra no existe.")
                        .build()
        );
    }

}
