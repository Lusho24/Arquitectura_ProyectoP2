package com.api.ecommerce.domain.repository.order;

import com.api.ecommerce.domain.model.order.PaymentOrderEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaymentOrderRepository extends CrudRepository<PaymentOrderEntity,Long> {
}
