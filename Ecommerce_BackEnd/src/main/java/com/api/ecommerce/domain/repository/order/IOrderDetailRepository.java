package com.api.ecommerce.domain.repository.order;

import com.api.ecommerce.domain.model.order.OrderDetailEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailRepository extends CrudRepository<OrderDetailEntity,Long> {
    List<OrderDetailEntity> findByPurchaseOrderId(Long purchaseOrderId);
}
