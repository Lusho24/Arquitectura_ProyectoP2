package com.api.ecommerce.adapter.exception;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.CartNotFoundException;
import com.api.ecommerce.application.exceptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(CartNotFoundException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleCartNotFoundException(CartNotFoundException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getExceptionDetailsDTO());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleUserNotFoundException(UserNotFoundException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getExceptionDetailsDTO());
    }

}
