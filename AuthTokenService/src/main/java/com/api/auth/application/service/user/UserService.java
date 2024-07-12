package com.api.auth.application.service.user;

import com.api.auth.domain.model.user.UserEntity;
import com.api.auth.domain.repository.user.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<UserEntity> findAllUsers() {
        return (ArrayList<UserEntity>)userRepository.findAll();
    }

    @Override
    public Optional<UserEntity> findUserById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("El email con el que intenta registrarse ya existe");
        }
        return userRepository.save(user);
    }

    @Override
    public Boolean deleteUserById(String id) {
        if (userRepository.existsById(id)){
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<UserEntity> findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

}
