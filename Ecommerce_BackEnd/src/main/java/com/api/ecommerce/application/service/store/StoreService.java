package com.api.ecommerce.application.service.store;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.store.StoreNotFoundException;
import com.api.ecommerce.domain.model.store.StoreEntity;
import com.api.ecommerce.domain.repository.store.IStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StoreService implements IStoreService {
    @Autowired
    private IStoreRepository storeRepository;

    @Override
    public List<StoreEntity> findAllStores() {
        return (ArrayList<StoreEntity>) storeRepository.findAll();
    }

    @Override
    public Optional<StoreEntity> findStoreById(Long id) {
        if (!storeRepository.existsById(id)){
            throw new StoreNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("La tienda que esta buscando no existe.")
                            .build()
            );
        }
        return storeRepository.findById(id);
    }

    @Override
    public StoreEntity saveStore(StoreEntity store) {
        return storeRepository.save(store);
    }

    @Override
    public void deleteStoreById(Long id) {
        if (!storeRepository.existsById(id)){
            throw new StoreNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("La tienda ya no existe.")
                            .build()
            );
        } else {
            storeRepository.deleteById(id);
        }
    }
}
