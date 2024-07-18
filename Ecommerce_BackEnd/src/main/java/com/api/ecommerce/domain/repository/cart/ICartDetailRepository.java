package com.api.ecommerce.domain.repository.cart;

import com.api.ecommerce.domain.model.cart.CartDetailEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartDetailRepository extends CrudRepository<CartDetailEntity, Long> {
}
