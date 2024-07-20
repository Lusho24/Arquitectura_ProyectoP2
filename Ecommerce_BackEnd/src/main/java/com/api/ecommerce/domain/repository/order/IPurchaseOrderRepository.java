package com.api.ecommerce.domain.repository.order;

import com.api.ecommerce.domain.model.order.PurchaseOrderEntity;
import com.api.ecommerce.domain.model.role.ERole;
import com.api.ecommerce.domain.model.role.RoleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPurchaseOrderRepository extends CrudRepository<PurchaseOrderEntity,Long> {
    Optional<PurchaseOrderEntity> findByPaymentOrderId(Long paymentOrderId);

}
