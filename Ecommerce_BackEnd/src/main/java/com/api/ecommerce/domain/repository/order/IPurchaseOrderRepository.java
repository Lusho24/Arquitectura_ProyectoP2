package com.api.ecommerce.domain.repository.order;

import com.api.ecommerce.domain.model.order.PurchaseOrderEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPurchaseOrderRepository extends CrudRepository<PurchaseOrderEntity,Long> {
}
