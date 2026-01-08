package com.example.todolistapk.GlobalException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(MailExistException.class)
    public ResponseEntity<CustomErrorResponse> handleMailExistException(MailExistException e) {
        CustomErrorResponse response = new CustomErrorResponse(
               e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
              "false"
                );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoCustomerException.class)
    public ResponseEntity<CustomErrorResponse> handleNoCustomerException(NoCustomerException e) {
        CustomErrorResponse response = new CustomErrorResponse(
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                "false"
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoTodoException.class)
    public ResponseEntity<CustomErrorResponse> handleNoTodoException(NoTodoException e) {
        CustomErrorResponse response = new CustomErrorResponse(
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                "false"
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoPriorityException.class)
    public ResponseEntity<CustomErrorResponse> handleNoPriorityException(NoPriorityException e) {
        CustomErrorResponse response = new CustomErrorResponse(
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                "false"
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
