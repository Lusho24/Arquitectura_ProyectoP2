package com.api.auth.domain.model.user;


import com.api.auth.domain.model.role.RoleEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "usuario")
public class UserEntity {

    @Id
    @Column(name = "IDUSUARIO")
    private String id;

    @Column(name = "IDTIENDA")
    private Integer idTienda;

    @Column(name = "NOMBREUSUARIO")
    private String name;

    @Column(name = "EMAILUSUARIO")
    private String email;

    @Column(name = "PASSWORDUSUARIO")
    private String password;

    @Column(name = "DIRECCIONUSUARIO")
    private String address;

    @Column(name = "TELFUSUARIO")
    private String phone;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = RoleEntity.class)
    @JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "IDUSUARIO"), inverseJoinColumns = @JoinColumn(name = "IDROL"))
    private Set<RoleEntity> roles;

}
