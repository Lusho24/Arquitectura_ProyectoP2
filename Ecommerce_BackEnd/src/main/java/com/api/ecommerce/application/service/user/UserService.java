package com.api.ecommerce.application.service.user;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.UserNotFoundException;
import com.api.ecommerce.domain.model.user.UserEntity;
import com.api.ecommerce.domain.repository.user.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    private IUserRepository userRepository;


    public Optional<UserEntity> findUserByEmail(String email){
        Optional<UserEntity> existUser = userRepository.findByEmail(email);
        if (existUser.isPresent()){
            return existUser;
        }
        throw new UserNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El usuario que esta buscando no existe.")
                        .build()
        );

    }

}
