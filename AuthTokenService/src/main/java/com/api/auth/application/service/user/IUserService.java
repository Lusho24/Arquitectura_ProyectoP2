package com.api.auth.application.service.user;

import com.api.auth.domain.model.user.UserEntity;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    public List<UserEntity> findAllUsers();
    public Optional<UserEntity> findUserById(String id);
    public UserEntity saveUser(UserEntity user);
    public Boolean deleteUserById(String id);

}
