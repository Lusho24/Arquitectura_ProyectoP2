package com.api.ecommerce.application.exceptions.cart;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartAlreadyExistsException extends RuntimeException{
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public CartAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public CartAlreadyExistsException(String message) {
        super(message);
    }

}
