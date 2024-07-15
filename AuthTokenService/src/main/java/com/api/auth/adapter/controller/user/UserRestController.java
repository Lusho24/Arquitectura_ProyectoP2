package com.api.auth.adapter.controller.user;

import com.api.auth.application.dto.CreateUserDTO;
import com.api.auth.application.dto.ExceptionDetailsDTO;
import com.api.auth.application.service.role.IRoleService;
import com.api.auth.application.service.user.IUserService;
import com.api.auth.domain.model.role.ERole;
import com.api.auth.domain.model.role.RoleEntity;
import com.api.auth.domain.model.user.UserEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private IUserService userService;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserEntity>> findAllUsers(){
        return ResponseEntity.ok().body(userService.findAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> findUserById(@PathVariable String id){
        return ResponseEntity.ok().body(userService.findUserById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@Valid @RequestBody CreateUserDTO userDTO, BindingResult result){
        if (result.hasErrors()) {
            return this.validate(result);
        }

        Set<RoleEntity> roles = userDTO.getRoles().stream()
                .map(role -> roleService.findRoleByName(ERole.valueOf(role))
                        .orElse(null))
                .collect(Collectors.toSet());

        UserEntity userEntity = UserEntity.builder()
                .id(userDTO.getId())
                .idTienda(userDTO.getIdTienda())
                .name(userDTO.getName())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .address(userDTO.getAddress())
                .phone(userDTO.getPhone())
                .roles(roles)
                .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(userEntity));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> deleteUserById(@PathVariable String id){
        userService.deleteUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ExceptionDetailsDTO.builder().statusCode(200).message("Usuario eliminado exitosamente.").build()
        );
    }

    private ResponseEntity<?> validate(BindingResult result) {
        List<Map<String, Object>> errors = new ArrayList<>();

        for (FieldError error : result.getFieldErrors()) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("Campo", error.getField());
            errorMap.put("Mensaje", error.getDefaultMessage());
            errors.add(errorMap);
        }
        return ResponseEntity.badRequest().body(errors);
    }

}
