package com.api.auth.application.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO {

    @NotBlank
    @Size(max = 10)
    private String id;

    @NotNull
    private Integer idTienda;

    @NotBlank
    @Size(max = 32)
    private String name;

    @NotBlank
    @Email
    @Size(max = 32)
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    @Size(max = 128)
    private String address;

    @NotBlank
    @Size(max = 16)
    private String phone;

    @NotNull
    private Set<String> roles;

}
