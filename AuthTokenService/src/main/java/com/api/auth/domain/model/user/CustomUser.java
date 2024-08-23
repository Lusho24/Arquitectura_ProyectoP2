package com.api.auth.domain.model.user;

import com.api.auth.domain.model.role.RoleEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Set;

@Getter
public class CustomUser extends User {
    private final String id;
    private final String name;
    private final String address;
    private final String phone;
    private final Integer idTienda;
    private Set<RoleEntity> roles;

    public CustomUser(String username, String password,
                      boolean enabled, boolean accountNonExpired,
                      boolean credentialsNonExpired,
                      boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities,
                      String id, String name, String address, String phone, Set<RoleEntity> roles, Integer idTienda) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.roles = roles;
        this.idTienda = idTienda;
    }

}
