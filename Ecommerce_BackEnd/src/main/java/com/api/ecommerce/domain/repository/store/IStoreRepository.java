package com.api.ecommerce.domain.repository.store;

import com.api.ecommerce.domain.model.store.StoreEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStoreRepository extends CrudRepository<StoreEntity, Long> {
}
