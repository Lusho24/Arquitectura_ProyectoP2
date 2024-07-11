package com.api.auth.application.service.role;

import com.api.auth.domain.model.role.ERole;
import com.api.auth.domain.model.role.RoleEntity;

import java.util.List;
import java.util.Optional;

public interface IRoleService {

    public List<RoleEntity> findAllRoles();
    public Optional<RoleEntity> findRoleById(int id);
    public RoleEntity saveRole(RoleEntity role);
    public Boolean deteleRoleById(int id);
    public Optional<RoleEntity> findRoleByName(ERole name);

}
