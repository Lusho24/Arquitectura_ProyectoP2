package com.api.auth.application.exceptions;

import com.api.auth.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserIdAlreadyExistsException extends RuntimeException {
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public UserIdAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public UserIdAlreadyExistsException(String message) {
        super(message);
    }

}
