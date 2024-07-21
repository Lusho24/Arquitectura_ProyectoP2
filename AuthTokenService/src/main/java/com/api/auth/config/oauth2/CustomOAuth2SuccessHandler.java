package com.api.auth.config.oauth2;

import com.api.auth.application.service.role.IRoleService;
import com.api.auth.application.service.user.IUserService;
import com.api.auth.application.service.user.UserDetailsServiceImpl;
import com.api.auth.config.jwt.JwtUtils;
import com.api.auth.domain.model.role.ERole;
import com.api.auth.domain.model.role.RoleEntity;
import com.api.auth.domain.model.user.CustomUser;
import com.api.auth.domain.model.user.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IRoleService roleService;

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2SuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = oauth2Token.getPrincipal();
        String email = oauth2User.getAttribute("email");
        Optional<UserEntity> userEntityOpt = userService.findUserByEmailGoogle(email);
        if (userEntityOpt.isEmpty()) {
            logger.error("USUARIO NO ENCONTRADO");

            Set<RoleEntity> roles = new HashSet<>();
            Optional<RoleEntity> userRol = roleService.findRoleByName(ERole.valueOf("USER"));
            userRol.ifPresent(roles::add);

            // Obtener el valor completo del atributo "Name"
            String fullId = oauth2User.getAttribute("sub");

            // Extraer los primeros 10 dígitos
            String mappedId = (fullId != null && fullId.length() > 10) ? fullId.substring(0, 10) : fullId;

            UserEntity newUser = UserEntity.builder()
                    .id(mappedId)
                    .idTienda(1)
                    .name(oauth2User.getAttribute("name"))
                    .email(email)
                    .password("")
                    .roles(roles)
                    .build();

            userService.saveUser(newUser);
        }

        CustomUser user = (CustomUser) userDetailsService.loadUserByUsername(email);
        String jwt = jwtUtils.generateAccessToken(user);

        // Configura la URL de redirección
        String redirectUrl = "http://localhost:4200/ecovida?token=" + jwt;
        response.sendRedirect(redirectUrl);

       /* // ** OPCION 2 **
        OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) authentication;
        //logger.info("OAuth2AuthenticationToken:  " + oauth2Token);
        OAuth2User oauth2User = oauth2Token.getPrincipal();
        logger.info("OAuth2User:  " + oauth2User);
        String email = oauth2User.getAttribute("email");

        CustomUser user = (CustomUser) userDetailsService.loadUserByUsername(email);
        logger.info("User  " + user);
        if (user == null) {
            // Lógica para manejar usuario no encontrado, tal vez crear un nuevo usuario
        }

        String jwt = jwtUtils.generateAccessToken(user);
        logger.info("Token generado: " + jwt);
        // Configura la URL de redirección
        String redirectUrl = "http://localhost:4200/ecovida?token=" + jwt;
        response.sendRedirect(redirectUrl);*/

    }

}
