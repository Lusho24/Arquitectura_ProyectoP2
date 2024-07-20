package com.api.ecommerce.application.service.cart;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.cart.CartNotFoundException;
import com.api.ecommerce.domain.model.cart.CartDetailEntity;
import com.api.ecommerce.domain.model.cart.CartEntity;
import com.api.ecommerce.domain.repository.cart.ICartDetailRepository;
import com.api.ecommerce.domain.repository.cart.ICartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartDetailService implements ICartDetailService{

    @Autowired
    private ICartDetailRepository cartDetailRepository;

    @Autowired
    ICartRepository cartRepository;

    @Override
    public List<CartDetailEntity> findAllCartDetail() {
        return (ArrayList<CartDetailEntity>)cartDetailRepository.findAll();
    }

    @Override
    public Optional<CartDetailEntity> findCartDetailById(Long id) {
        if (cartDetailRepository.existsById(id)){
            return cartDetailRepository.findById(id);
        }
        throw new CartNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El detalle del carrito que esta buscando no existe.")
                        .build()
        );
    }

    @Override
    public CartDetailEntity saveCartDetail(CartDetailEntity cartDetail) {
        Optional<CartEntity> cart = cartRepository.findById(cartDetail.getCartId());
        if (cart.isEmpty()){
            throw new CartNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("No existe un Carrito  para agregar los Detalles de Carrito.")
                            .build()
            );
        }
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public void deleteCartDetailById(Long id) {
        if (cartDetailRepository.existsById(id)){
            cartDetailRepository.deleteById(id);
        } else {
            throw new CartNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("El detalle del carrito ya no existe.")
                            .build()
            );
        }

    }

    @Override
    public Optional<CartDetailEntity> updateProductQuantity(Long id, int productQuantity) {
        Optional<CartDetailEntity> cartDetail = cartDetailRepository.findById(id);
        if (cartDetail.isPresent()){
            CartDetailEntity updateCartDetail = cartDetail.get();
            updateCartDetail.setProductQuantity(productQuantity);
            return Optional.of(cartDetailRepository.save(updateCartDetail));
        }
        throw new CartNotFoundException(
                ExceptionDetailsDTO.builder()
                .statusCode(404)
                .message("El detalle del carrito no existe.")
                .build());
    }

}
