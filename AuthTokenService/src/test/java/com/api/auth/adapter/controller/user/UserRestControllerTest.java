package com.api.auth.adapter.controller.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@WebAppConfiguration
class UserRestControllerTest {
    private final static String url = "/api/users";
    private final static String token = "Bearer " +
            "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiQ2FsbGUgUHJpbmNpcGFsIDQ1NiwgU2FuZ29scXVpIiwicGhvbmUiOiIwOTk4NzY1NDMyMiIsInJvbGVzIjpbeyJpZCI6MSwibmFtZSI6IkFETUlOIn0seyJpZCI6MiwibmFtZSI6IlVTRVIifV0sIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiaWQiOiIxNzEyMzQ1Njc4IiwiaWF0IjoxNzIxNzg4Mzk5LCJleHAiOjE3MjE4NzQ3OTl9.kuua_3yDVWu0L9jhDa4AIlmxUBnpLDsjz7RwCC8NgP97qAC9wrWrqA0XdT7xRaoi";
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    void findAllUsers() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(url.concat("/all"))
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    void findUserById() {
    }

    @Test
    void saveUser() {
    }

    @Test
    void deleteUserById() {
    }
}
