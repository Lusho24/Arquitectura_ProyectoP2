package com.api.ecommerce.domain.repository.cart;

import com.api.ecommerce.domain.model.cart.CartEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICartRepository extends CrudRepository<CartEntity, Long> {

    Optional<CartEntity> findByUserId (String userId);

}
