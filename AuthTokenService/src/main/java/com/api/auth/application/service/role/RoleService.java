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
    public List<RoleEntity> findAllRoles() {
        return (ArrayList<RoleEntity>) roleRepository.findAll();
    }

    @Override
    public Optional<RoleEntity> findRoleById(int id) {
        return roleRepository.findById(id);
    }

    @Override
    public RoleEntity saveRole(RoleEntity role) {
        return roleRepository.save(role);
    }

    @Override
    public Boolean deteleRoleById(int id) {
        if (roleRepository.existsById(id)){
            roleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Optional<RoleEntity> findRoleByName(ERole name) {
        return roleRepository.findByName(name);
    }

}
