package com.api.ecommerce.domain.repository.role;

import com.api.ecommerce.domain.model.role.ERole;
import com.api.ecommerce.domain.model.role.RoleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends CrudRepository<RoleEntity, Integer> {
    Optional<RoleEntity> findByName(ERole name);

}
