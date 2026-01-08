package com.example.todolistapk.GlobalException;

public class NoCustomerException extends RuntimeException {
    public NoCustomerException(String message) {
        super(message);
    }
}
