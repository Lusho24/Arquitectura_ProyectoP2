package com.api.ecommerce.adapter.exception;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.cart.CartAlreadyExistsException;
import com.api.ecommerce.application.exceptions.cart.CartNotFoundException;
import com.api.ecommerce.application.exceptions.order.OrderAlreadyExistsException;
import com.api.ecommerce.application.exceptions.order.OrderNotFoundException;
import com.api.ecommerce.application.exceptions.other.UserNotFoundException;
import com.api.ecommerce.application.exceptions.shipment.ShipmentNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // * Excepciones del carrito de compras - CART
    @ExceptionHandler(CartNotFoundException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleCartNotFoundException(CartNotFoundException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getExceptionDetailsDTO());
    }

    @ExceptionHandler(CartAlreadyExistsException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleCartAlreadyExistsException(CartAlreadyExistsException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getExceptionDetailsDTO());
    }

    // * Excepciones del usuario - USER
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleUserNotFoundException(UserNotFoundException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getExceptionDetailsDTO());
    }


    // * Excepciones del envío - SHIPMENT
    @ExceptionHandler(ShipmentNotFoundException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleShipmentNotFoundException(ShipmentNotFoundException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getExceptionDetailsDTO());
    }

    // * Excepciones de la orden - PAYMENT ORDER/PURCHASE ORDER
    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleOrderNotFoundException(OrderNotFoundException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getExceptionDetailsDTO());
    }

    @ExceptionHandler(OrderAlreadyExistsException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleOrderAlreadyExistsException(OrderAlreadyExistsException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getExceptionDetailsDTO());
    }

}
