package com.api.ecommerce.application.service.order;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.order.OrderNotFoundException;
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
        return purchaseOrderRepository.save(purchaseOrder);
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

}
