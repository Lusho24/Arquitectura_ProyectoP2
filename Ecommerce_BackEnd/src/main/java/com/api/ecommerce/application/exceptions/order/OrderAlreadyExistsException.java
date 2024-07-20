package com.api.ecommerce.application.exceptions.order;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderAlreadyExistsException extends RuntimeException{
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public OrderAlreadyExistsException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

}
