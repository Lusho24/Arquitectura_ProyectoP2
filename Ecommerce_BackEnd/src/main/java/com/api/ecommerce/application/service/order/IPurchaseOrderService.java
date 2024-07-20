package com.api.ecommerce.application.service.order;

import com.api.ecommerce.domain.model.order.PurchaseOrderEntity;

import java.util.List;
import java.util.Optional;

public interface IPurchaseOrderService {

    public List<PurchaseOrderEntity> findAllPurchaseOrders();
    public Optional<PurchaseOrderEntity> findPurchaseOrderById(Long id);
    public PurchaseOrderEntity savePurchaseOrder(PurchaseOrderEntity purchaseOrder);
    public void deletePurchaseOrderById(Long id);
    public Optional<PurchaseOrderEntity> updateState(Long id,String state);

}
