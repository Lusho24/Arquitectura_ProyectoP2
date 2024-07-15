package com.api.auth.adapter.exceptions;

import com.api.auth.application.dto.ExceptionDetailsDTO;
import com.api.auth.application.exceptions.UserEmailAlreadyExistsException;
import com.api.auth.application.exceptions.UserIdAlreadyExistsException;
import com.api.auth.application.exceptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(UserIdAlreadyExistsException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleUserIdAlreadyExistsException(UserIdAlreadyExistsException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return  new ResponseEntity<>(ex.getExceptionDetailsDTO(),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserEmailAlreadyExistsException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleUserEmailAlreadyExistsExceptionHandler(UserEmailAlreadyExistsException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return  new ResponseEntity<>(ex.getExceptionDetailsDTO(),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionDetailsDTO> handleUserNotFoundException(UserNotFoundException ex){
        logger.error("ERROR: " + ex.getExceptionDetailsDTO(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getExceptionDetailsDTO());
    }

}
