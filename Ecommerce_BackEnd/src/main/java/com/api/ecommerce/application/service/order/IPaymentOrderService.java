package com.api.ecommerce.application.service.order;

import com.api.ecommerce.domain.model.order.PaymentOrderEntity;

import java.util.List;
import java.util.Optional;

public interface IPaymentOrderService {

    public List<PaymentOrderEntity> findAllPaymentOrders();
    public Optional<PaymentOrderEntity> findPaymentOrderById(Long id);
    public PaymentOrderEntity savePaymentOrder(PaymentOrderEntity paymentOrder);
    public void deletePaymentOrderById(Long id);

}
