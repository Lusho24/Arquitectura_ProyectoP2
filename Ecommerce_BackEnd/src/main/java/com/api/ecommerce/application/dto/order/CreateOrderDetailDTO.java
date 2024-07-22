package com.api.ecommerce.application.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CreateOrderDetailDTO {

    @NotNull
    private Long purchaseOrderId;

    @NotBlank
    private String name;

    @NotNull
    private int productQuantity;

    @NotNull
    private BigDecimal price;

}
