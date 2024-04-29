package com.example.demoback.util;

public class CustomException extends Exception{
    public static final String EMPTY_VALUE = "Recurso vacio";

    public CustomException (String message) {
        super(message);
    }
}
