package com.api.ecommerce.application.service.order;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.order.OrderNotFoundException;
import com.api.ecommerce.domain.model.order.PaymentOrderEntity;
import com.api.ecommerce.domain.repository.order.IPaymentOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentOrderService implements IPaymentOrderService{

    @Autowired
    private IPaymentOrderRepository paymentOrderRepository;
    @Override
    public List<PaymentOrderEntity> findAllPaymentOrders() {
        return (ArrayList<PaymentOrderEntity>) paymentOrderRepository.findAll();
    }

    @Override
    public Optional<PaymentOrderEntity> findPaymentOrderById(Long id) {
        if (paymentOrderRepository.existsById(id)){
            return paymentOrderRepository.findById(id);
        }
        throw new OrderNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("La orden de pago que esta buscando no existe.")
                        .build()
        );
    }

    @Override
    public PaymentOrderEntity savePaymentOrder(PaymentOrderEntity paymentOrder) {
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public void deletePaymentOrderById(Long id) {
        if (paymentOrderRepository.existsById(id)){
            paymentOrderRepository.deleteById(id);
        } else {
            throw new OrderNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("La orden de pago ya no existe.")
                            .build()
            );
        }
    }

}
