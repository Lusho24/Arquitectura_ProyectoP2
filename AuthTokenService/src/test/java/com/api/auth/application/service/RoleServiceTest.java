package com.api.auth.application.service;

import com.api.auth.application.service.role.RoleService;
import com.api.auth.domain.model.role.ERole;
import com.api.auth.domain.model.role.RoleEntity;
import com.api.auth.domain.repository.role.IRoleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class RoleServiceTest {

    @Mock
    private IRoleRepository roleRepository;

    @InjectMocks
    private RoleService roleService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // * Pruebas con resultado Exitoso
    @Test
    void findRoleByName_Admin() {
        // Arrange
        RoleEntity adminRole = new RoleEntity();
        adminRole.setId(1);
        adminRole.setName(ERole.ADMIN);

        when(roleRepository.findByName(ERole.ADMIN)).thenReturn(Optional.of(adminRole));

        // Act
        Optional<RoleEntity> result = roleService.findRoleByName(ERole.ADMIN);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(ERole.ADMIN, result.get().getName());
    }

    @Test
    void findRoleByName_User() {
        // Arrange
        RoleEntity userRole = new RoleEntity();
        userRole.setId(2);
        userRole.setName(ERole.USER);

        when(roleRepository.findByName(ERole.USER)).thenReturn(Optional.of(userRole));

        // Act
        Optional<RoleEntity> result = roleService.findRoleByName(ERole.USER);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(ERole.USER, result.get().getName());
    }


    // * Pruebas con Resultado Fallido
    @Test
    void findRoleByName_UserNotFound(){
        // Arrange
        when(roleRepository.findByName(ERole.USER)).thenReturn(Optional.empty());

        // Act
        Optional<RoleEntity> result = roleService.findRoleByName(ERole.USER);

        //Assert
        assertFalse(result.isPresent());
    }

}
