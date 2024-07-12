package com.api.auth.domain.repository.user;

import com.api.auth.domain.model.user.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends CrudRepository<UserEntity,String> {

    Optional<UserEntity> findByName(String name);
    Optional<UserEntity> findByEmail(String email);

}
