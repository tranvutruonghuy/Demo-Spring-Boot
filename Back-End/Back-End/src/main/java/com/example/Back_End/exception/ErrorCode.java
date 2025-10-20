package com.example.Back_End.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR), //500
    INVALID_KEY(1001, "Invalid message key", HttpStatus.BAD_REQUEST), //404
    USER_EXISTED(1002, "User already exists", HttpStatus.BAD_REQUEST), //404
    USERNAME_INVALID(1003, "Username must be at least 3 characters long", HttpStatus.BAD_REQUEST), //404
    PASSWORD_INVALID(1004, "Password must be at least 8 characters long", HttpStatus.BAD_REQUEST), //404
    USER_NOT_EXISTED(1005, "User not found", HttpStatus.NOT_FOUND), //404
    USERNAME_NULL(1006, "Username cannot be null", HttpStatus.BAD_REQUEST), //404
    PASSWORD_NULL(1007, "Password cannot be null", HttpStatus.BAD_REQUEST), //404
    NAME_NULL(1008, "Name cannot be null", HttpStatus.BAD_REQUEST), //404
    DOB_NULL(1009, "Dob cannot be null", HttpStatus.BAD_REQUEST), //404
    UNAUTHENTICATED(1010, "Unauthenticated", HttpStatus.UNAUTHORIZED), //401
    UNAUTHORIZED(1011, "You do not have permission", HttpStatus.FORBIDDEN), //403
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
