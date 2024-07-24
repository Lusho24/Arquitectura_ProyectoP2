package com.api.auth.application.service;

import com.api.auth.application.exceptions.UserNotFoundException;
import com.api.auth.application.service.user.UserService;
import com.api.auth.domain.model.role.ERole;
import com.api.auth.domain.model.role.RoleEntity;
import com.api.auth.domain.model.user.UserEntity;
import com.api.auth.domain.repository.user.IUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UserEntity user1;
    private UserEntity user2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Lista de roles
        Set<RoleEntity> roles = new HashSet<>();
        RoleEntity adminRole = RoleEntity.builder()
                .id(1)
                .name(ERole.ADMIN).build();
        roles.add(adminRole);

        // Usuario 1
        user1 = UserEntity.builder()
                .id("123")
                .idTienda(1)
                .email("admin@gmail.com")
                .name("Francisco")
                .password("admin")
                .address("Amaguaña")
                .phone("09926678")
                .roles(roles).build();

        // Usuario 2
        user2 = UserEntity.builder()
                .id("17")
                .idTienda(1)
                .email("user@gmail.com")
                .name("Usuario 2")
                .password("1234")
                .address("Amaguaña")
                .phone("09926678")
                .roles(roles).build();
    }

    // * Pruebas con Resultado Exitoso
    @Test
    void findAllUsers_Success() {
        // Arrange
        List<UserEntity> listUsers = new ArrayList<>();
        listUsers.add(user1);
        listUsers.add(user2);

        when(userRepository.findAll()).thenReturn(listUsers);

        // Act
        List<UserEntity> result = userService.findAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(2,result.size());
        assertEquals(user1, result.get(0));
    }

    @Test
    void findUserById_user2_Success() {
        // Arrange
        String userId = "17";

        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user2));

        // Act
        Optional<UserEntity> result = userService.findUserById(userId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(user2, result.get());
    }

    @Test
    void saveUser_user1_Success() {
        // Arrange
        when(userRepository.save(any(UserEntity.class))).thenReturn(user1);

        // Act
        UserEntity result = userService.saveUser(user1);

        // Assert
        assertNotNull(result);
        assertEquals(user1.getId(),result.getId());

    }

    @Test
    void deleteUserById_Success() {
        // Arrange
        String userId = "17";
        when(userRepository.existsById(userId)).thenReturn(true);

        // Act
        userService.deleteUserById(userId);

        // Assert
        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void findUserByEmail() {
        // Arrange
        String email = "user@gmail.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user2));

        // Act
        Optional<UserEntity> result = userService.findUserByEmail(email);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(user2, result.get());
    }


    // * Pruebas con Resultado Exitoso
    @Test
    void findUserById_user2_UserNotFound(){
        // Arrange
        String userId = "17";

        when(userRepository.existsById(userId)).thenReturn(false);

        // Act
        UserNotFoundException result = assertThrows(UserNotFoundException.class, () -> {
            userService.findUserById(userId);
        });
        System.out.println(result.getExceptionDetailsDTO());

        // Assert
        assertEquals(404, result.getExceptionDetailsDTO().getStatusCode());
        assertEquals("El usuario que esta buscando no existe.", result.getMessage());
    }

}
