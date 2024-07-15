package com.api.auth.application.exceptions;

import com.api.auth.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEmailAlreadyExistsException extends RuntimeException {
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public UserEmailAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public UserEmailAlreadyExistsException(String message) {
        super(message);
    }

}
