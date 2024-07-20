package com.api.ecommerce.application.service.cart;

import com.api.ecommerce.domain.model.cart.CartDetailEntity;

import java.util.List;
import java.util.Optional;

public interface ICartDetailService {

    public List<CartDetailEntity> findAllCartDetail();
    public Optional<CartDetailEntity> findCartDetailById(Long id);
    public CartDetailEntity saveCartDetail(CartDetailEntity cartDetail);
    public void deleteCartDetailById(Long id);
    public Optional<CartDetailEntity> updateProductQuantity(Long id, int productQuantity);

}
