package com.api.ecommerce.application.dto.store;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateStoreDTO {

    @NotBlank
    @Size(max = 32)
    private String name;

    @NotBlank
    @Size(max = 64)
    private String address;

    @NotBlank
    @Size(max = 16)
    private String phone;

    @Size(max = 128)
    private String description;

    private String imgLogo;

}
