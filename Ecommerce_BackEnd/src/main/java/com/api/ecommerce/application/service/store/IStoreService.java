package com.api.ecommerce.application.service.store;

import com.api.ecommerce.domain.model.store.StoreEntity;

import java.util.List;
import java.util.Optional;

public interface IStoreService {

    public List<StoreEntity> findAllStores();
    public Optional<StoreEntity> findStoreById(Long id);
    public StoreEntity saveStore(StoreEntity store);
    public void deleteStoreById(Long id);

}
