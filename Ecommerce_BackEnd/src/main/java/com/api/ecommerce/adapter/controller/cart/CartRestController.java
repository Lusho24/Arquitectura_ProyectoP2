package com.api.ecommerce.adapter.controller.cart;

import com.api.ecommerce.application.dto.CreateCartDTO;
import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.service.cart.ICartService;
import com.api.ecommerce.domain.model.cart.CartEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ecommerce/cart")
public class CartRestController {

    @Autowired
    private ICartService cartService;

    @GetMapping("/all")
    public ResponseEntity<List<CartEntity>> findAllCarts(){
        return ResponseEntity.ok().body(cartService.findAllCarts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<?>> findCartById(@PathVariable Long id){
        return ResponseEntity.ok().body(cartService.findCartById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveCart(@Valid @RequestBody CreateCartDTO cartDTO, BindingResult result){
        if (result.hasErrors()) {
            return this.validate(result);
        }

        CartEntity cart = CartEntity.builder()
                .userId(cartDTO.getUserId())
                .total(cartDTO.getTotal())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.saveCart(cart));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id){
        cartService.deleteCartById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ExceptionDetailsDTO.builder().statusCode(200).message("Carrito eliminado exitosamente.").build()
        );
    }

    @GetMapping("/by-user-id/{id}")
    public ResponseEntity<?> findCartByUserId(@PathVariable String id){
        return ResponseEntity.ok().body(cartService.findCartByUserId(id));
    }


    private ResponseEntity<?> validate(BindingResult result) {
        List<Map<String, Object>> errors = new ArrayList<>();

        for (FieldError error : result.getFieldErrors()) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("Campo", error.getField());
            errorMap.put("Mensaje", error.getDefaultMessage());
            errors.add(errorMap);
        }
        return ResponseEntity.badRequest().body(errors);
    }

}
