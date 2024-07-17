package com.api.ecommerce.application.exceptions.cart;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartNotFoundException extends RuntimeException{
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public CartNotFoundException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

    public CartNotFoundException(String message) {
        super(message);
    }

}
