package com.api.ecommerce.adapter.controller.cart;

import com.api.ecommerce.application.dto.CreateCartDetailDTO;
import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.service.cart.ICartDetailService;
import com.api.ecommerce.domain.model.cart.CartDetailEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.api.ecommerce.util.ValidationUtil.getValidationErrors;

@RestController
@RequestMapping("/api/ecommerce/cart-detail")
public class CartDetailRestController {

    @Autowired
    private ICartDetailService cartDetailService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CartDetailEntity>> findAllCartDetail(){
        return ResponseEntity.status(HttpStatus.OK).body(cartDetailService.findAllCartDetail());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<?>> findCartDetailById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(cartDetailService.findCartDetailById(id));
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> saveCartDetail(@Valid @RequestBody CreateCartDetailDTO cartDetailDTO,
                                            BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(getValidationErrors(result));
        }

        CartDetailEntity cartDetail = CartDetailEntity.builder()
                .productId(cartDetailDTO.getProductId())
                .cartId(cartDetailDTO.getCartId())
                .productQuantity(cartDetailDTO.getProductQuantity())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(cartDetailService.saveCartDetail(cartDetail));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> deleteCartDetailById(@PathVariable Long id){
        cartDetailService.deleteCartDetailById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ExceptionDetailsDTO.builder()
                        .statusCode(200)
                        .message("Detalle del carrito eliminada exitosamente.")
                        .build()
        );
    }

}
