package com.api.auth.application.service.user;

import com.api.auth.adapter.controller.user.UserRestController;
import com.api.auth.application.dto.ExceptionDetailsDTO;
import com.api.auth.application.exceptions.UserEmailAlreadyExistsException;
import com.api.auth.application.exceptions.UserIdAlreadyExistsException;
import com.api.auth.application.exceptions.UserNotFoundException;
import com.api.auth.domain.model.user.UserEntity;
import com.api.auth.domain.repository.user.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<UserEntity> findAllUsers() {
        return (ArrayList<UserEntity>) userRepository.findAll();
    }

    @Override
    public Optional<UserEntity> findUserById(String id) {
        if (userRepository.existsById(id)) {
            return userRepository.findById(id);
        }
        throw new UserNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El usuario que esta buscando no existe.")
                        .build()
        );
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        Optional<UserEntity> existingUserId = userRepository.findById(user.getId());
        Optional<UserEntity> existingUserEmail = userRepository.findByEmail(user.getEmail());

        if (existingUserId.isPresent()) {
            throw new UserIdAlreadyExistsException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(409)
                            .message("El usuario ya se encuentra registrado.")
                            .build()
            );
        }
        if (existingUserEmail.isPresent()) {
            throw new UserEmailAlreadyExistsException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(409)
                            .message("El email con el que intenta registrarse ya existe.")
                            .build()
            );
        }
        logger.info("INFO: El usuario se registro correctamente.");
        return userRepository.save(user);
    }

    @Override
    public void deleteUserById(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new UserNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("El usuario ya no existe.")
                            .build()
            );
        }
    }

    public Optional<UserEntity> findUserByEmail(String email) {
        Optional<UserEntity> existUser = userRepository.findByEmail(email);
        if (existUser.isPresent()) {
            return existUser;
        }
        throw new UserNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El usuario que esta buscando no existe.")
                        .build()
        );

    }

    public Optional<UserEntity> findUserByEmailGoogle(String email){
        return userRepository.findByEmail(email);
    }

}
