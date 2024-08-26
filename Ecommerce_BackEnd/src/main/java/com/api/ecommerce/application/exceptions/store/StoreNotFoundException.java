package com.api.ecommerce.application.exceptions.store;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreNotFoundException extends RuntimeException{
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public StoreNotFoundException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }
}
