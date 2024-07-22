package com.api.ecommerce.application.service.order;

import com.api.ecommerce.domain.model.order.OrderDetailEntity;

import java.util.List;
import java.util.Optional;

public interface IOrderDetailService {

    public List<OrderDetailEntity> findAllOrderDetails();
    public Optional<OrderDetailEntity> findOrderDetailById(Long id);
    public OrderDetailEntity saveOrderDetail(OrderDetailEntity orderDetail);
    public void deleteOrderDetailById(Long id);

}
