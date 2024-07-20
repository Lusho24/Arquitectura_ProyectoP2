package com.api.ecommerce.application.dto.cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCartDetailDTO {

    @NotNull
    @Min(value = 1, message = "El id del producto debe ser mayor que 0")
    private Long productId;

    @NotNull
    @Min(value = 1, message = "El id del producto debe ser mayor que 0")
    private Long cartId;

    @NotNull
    @Min(value = 1, message = "La cantidad del producto debe ser mayor que 0")
    private int productQuantity;

}
