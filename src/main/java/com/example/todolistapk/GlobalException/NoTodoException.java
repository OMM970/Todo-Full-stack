package com.example.todolistapk.GlobalException;

public class NoTodoException extends RuntimeException {
    public NoTodoException(String message) {
        super(message);
    }
}
