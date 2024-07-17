package com.api.ecommerce.application.service.cart;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.cart.CartAlreadyExistsException;
import com.api.ecommerce.application.exceptions.cart.CartNotFoundException;
import com.api.ecommerce.domain.model.cart.CartEntity;
import com.api.ecommerce.domain.repository.cart.ICartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService implements ICartService{

    @Autowired
    private ICartRepository cartRepository;

    @Override
    public List<CartEntity> findAllCarts() {
        return (ArrayList<CartEntity>)cartRepository.findAll();
    }

    @Override
    public Optional<CartEntity> findCartById(Long id) {
        if (cartRepository.existsById(id)){
            return cartRepository.findById(id);
        }
        throw new CartNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El carrito que esta buscando no existe.")
                        .build()
        );
    }

    @Override
    public CartEntity saveCart(CartEntity cart) {
        Optional<CartEntity> existingCart = cartRepository.findByUserId(cart.getUserId());
        if (existingCart.isPresent()){
            throw new CartAlreadyExistsException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(409)
                            .message("El usuario ya tiene un carrito.")
                            .build()
            );
        }
        return cartRepository.save(cart);
    }

    @Override
    public void deleteCartById(Long id) {
        if (cartRepository.existsById(id)){
            cartRepository.deleteById(id);
        } else {
            throw new CartNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("El carrito ya no existe.")
                            .build()
            );
        }
    }

    @Override
    public Optional<CartEntity> findCartByUserId(String userId) {
        Optional<CartEntity> existCar = cartRepository.findByUserId(userId);
        if (existCar.isPresent()){
            return existCar;
        }
        throw new CartNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El carrito que esta buscando no existe.")
                        .build()
        );
    }

}
