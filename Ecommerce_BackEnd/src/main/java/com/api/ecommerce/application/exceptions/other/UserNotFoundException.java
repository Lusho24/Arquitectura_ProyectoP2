package com.api.ecommerce.application.exceptions.other;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
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
