package com.api.ecommerce.application.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreatePurchaseOrderDTO {

    @NotNull
    private Long paymentOrderId;

    @NotBlank
    @Size(max = 16)
    private String state;

}
