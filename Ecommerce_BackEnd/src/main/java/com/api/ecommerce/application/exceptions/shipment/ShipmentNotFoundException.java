package com.api.ecommerce.application.exceptions.shipment;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShipmentNotFoundException extends RuntimeException{
    private ExceptionDetailsDTO exceptionDetailsDTO;

    public ShipmentNotFoundException(ExceptionDetailsDTO exceptionDetailsDTO) {
        super(exceptionDetailsDTO.getMessage());
        this.exceptionDetailsDTO = exceptionDetailsDTO;
    }

}
