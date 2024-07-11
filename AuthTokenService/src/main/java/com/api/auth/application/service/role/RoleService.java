package com.api.auth.application.service.role;

import com.api.auth.domain.model.role.ERole;
import com.api.auth.domain.model.role.RoleEntity;
import com.api.auth.domain.repository.role.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService{

    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public Optional<RoleEntity> findRoleByName(ERole name) {
        return roleRepository.findByName(name);
    }

}
