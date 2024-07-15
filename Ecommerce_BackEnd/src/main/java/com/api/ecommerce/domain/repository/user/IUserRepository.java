package com.api.ecommerce.domain.repository.user;

import com.api.ecommerce.domain.model.user.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends CrudRepository<UserEntity,String> {
    Optional<UserEntity> findByEmail(String email);

}
