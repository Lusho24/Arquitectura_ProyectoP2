package com.api.auth.adapter.controller.user;

import com.api.auth.application.dto.CreateUserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;


import java.util.Set;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final static String url = "/api/users";


    @BeforeEach
    void setUp() {
    }

    // * Pruebas con Resultado Exitoso
    @Test
    @WithMockUser(roles = {"ADMIN"})
    void findAllUsers_Success() throws Exception {
        mockMvc.perform(get(url + "/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    void findUserById_Success() throws Exception {
        String userId = "1798765430";

        mockMvc.perform(get(url + "/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId));
    }

    @Test
    void saveUser_Success() throws Exception {
        CreateUserDTO user = new CreateUserDTO();
        user.setId("17");
        user.setIdTienda(1);
        user.setName("Usuario Test");
        user.setEmail("testuser@example.com");
        user.setPassword("123456");
        user.setAddress("Test direccion");
        user.setPhone("098765");
        user.setRoles(Set.of("USER"));

        mockMvc.perform(post(url + "/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("17"));
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    void deleteUserById_Success() throws Exception {
        String userId = "17";

        mockMvc.perform(delete(url + "/delete/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Usuario eliminado exitosamente."));
    }


    // * Pruebas con Resultado Fallido
    @Test
    void saveUserValidationErrors() throws Exception {
        CreateUserDTO userDTO = new CreateUserDTO();

        mockMvc.perform(post(url+"/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", hasSize(8)));
    }

}
