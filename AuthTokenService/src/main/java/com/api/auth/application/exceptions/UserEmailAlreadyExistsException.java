package com.api.auth.application.exceptions;

import com.api.auth.application.dto.ExceptionDetailsDTO;
import lombok.Getter;

@Getter
public class UserEmailAlreadyExistsException extends RuntimeException {
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public UserEmailAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO, String message) {
        super(message);
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public UserEmailAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO) {
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public UserEmailAlreadyExistsException(String message) {
        super(message);
    }


    public void setExceptionDetailsDTO(ExceptionDetailsDTO exceptionDetailsDTO) {
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }
}
