package com.api.ecommerce.application.service.user;

import com.api.ecommerce.domain.model.user.UserEntity;

import java.util.Optional;

public interface IUserService {
    public Optional<UserEntity> findUserByEmail(String email);

}
