package com.example.Back_End.exception;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception"),
    INVALID_KEY(1001, "Invalid message key"),
    USER_EXISTED(1002, "User already exists"),
    USERNAME_INVALID(1003, "Username must be at least 3 characters long"),
    PASSWORD_INVALID(1004, "Password must be at least 8 characters long"),
    ;

    private int code;
    private String message;


    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
