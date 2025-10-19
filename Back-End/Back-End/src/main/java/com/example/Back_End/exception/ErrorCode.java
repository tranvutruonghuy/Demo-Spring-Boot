package com.example.Back_End.exception;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception"),
    INVALID_KEY(1001, "Invalid message key"),
    USER_EXISTED(1002, "User already exists"),
    USERNAME_INVALID(1003, "Username must be at least 3 characters long"),
    PASSWORD_INVALID(1004, "Password must be at least 8 characters long"),
    USER_NOT_EXISTED(1005, "User not found"),
    USERNAME_NULL(1006, "Username cannot be null"),
    PASSWORD_NULL(1007, "Password cannot be null"),
    NAME_NULL(1008, "Name cannot be null"),
    DOB_NULL(1009, "Dob cannot be null"),
    UNAUTHENTICATED(1010, "Unauthenticated"),
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
