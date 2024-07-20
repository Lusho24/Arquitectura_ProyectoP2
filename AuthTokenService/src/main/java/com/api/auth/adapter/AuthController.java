package com.api.auth.adapter;

import com.api.auth.application.service.user.UserDetailsServiceImpl;
import com.api.auth.config.jwt.JwtUtils;
import com.api.auth.domain.model.user.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/token")
    public ResponseEntity<Map<String, String>> getToken(@RequestBody Map<String, String> authCode) {
        // Aquí deberías manejar el authCode y generar el token
        // Este es solo un ejemplo simplificado
        String code = authCode.get("code");
        String email = "extracted_email_from_code"; // Lógica para extraer email del authCode
        CustomUser customUser = (CustomUser) userDetailsService.loadUserByUsername(email);
        String jwt = jwtUtils.generateAccessToken(customUser);

        Map<String, String> tokenResponse = new HashMap<>();
        tokenResponse.put("token", jwt);

        return ResponseEntity.ok(tokenResponse);
    }


}
