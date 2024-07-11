package com.api.auth.application.service.role;

import com.api.auth.domain.model.role.ERole;
import com.api.auth.domain.model.role.RoleEntity;

import java.util.List;
import java.util.Optional;

public interface IRoleService {

    public Optional<RoleEntity> findRoleByName(ERole name);

}
