package com.api.ecommerce.application.service.cart;

import com.api.ecommerce.domain.model.cart.CartEntity;

import java.util.List;
import java.util.Optional;

public interface ICartService {

    public List<CartEntity> findAllCarts();
    public Optional<CartEntity> findCartById(Long id);
    public CartEntity saveCart(CartEntity cart);
    public void deleteCartById(Long id);
    public Optional<CartEntity> findCartByUserId(String userId);

}
