package com.api.ecommerce.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CreatePaymentOrderDTO {

    @NotNull
    private Long cartId;

    @NotNull
    private Long shipmentId;

    @NotBlank
    @Size(max = 16)
    private String method;

    @NotBlank
    @Size(max = 16)
    private String state;

    @NotNull
    private BigDecimal total;

}
