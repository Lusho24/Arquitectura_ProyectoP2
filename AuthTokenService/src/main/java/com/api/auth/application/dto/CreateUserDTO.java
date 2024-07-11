package com.api.auth.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotBlank
    private Integer idTienda;

    @NotBlank
    @Size(max = 32)
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String address;

    @NotBlank
    private String phone;

    @NotNull
    private Set<String> roles;

}
