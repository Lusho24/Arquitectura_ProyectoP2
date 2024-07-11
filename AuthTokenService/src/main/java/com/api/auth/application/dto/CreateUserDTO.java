package com.api.auth.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO {

    private String id;
    private Integer idTienda;
    private String name;
    private String email;
    private String password;
    private String address;
    private String phone;
    private Set<String> roles;

}
