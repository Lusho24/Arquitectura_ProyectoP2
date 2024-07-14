package com.api.auth.application.exceptions;

import com.api.auth.application.dto.ExceptionDetailsDTO;
import lombok.Getter;

@Getter
public class UserIdAlreadyExistsException extends RuntimeException {
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public UserIdAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO, String message) {
        super(message);
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public UserIdAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO) {
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public UserIdAlreadyExistsException(String message) {
        super(message);
    }


    public void setExceptionDetailsDTO(ExceptionDetailsDTO exceptionDetailsDTO) {
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }
}
