package com.example.todolistapk.GlobalException;

public class MailExistException extends RuntimeException {
    public MailExistException(String message) {
        super(message);
    }
}
