package com.api.auth.application.exceptions;

import com.api.auth.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserNotFoundException extends RuntimeException{
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public UserNotFoundException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public UserNotFoundException(String message) {
        super(message);
    }

}
