package com.api.ecommerce.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CreateCartDTO {

    @NotBlank
    @Size(max = 10)
    private String userId;

    @NotNull
    private BigDecimal total;

}
