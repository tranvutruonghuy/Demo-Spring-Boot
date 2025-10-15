package com.example.Back_End.controller;

import com.example.Back_End.dto.request.UserCreationRequest;
import com.example.Back_End.dto.request.UserUpdateRequest;
import com.example.Back_End.dto.response.ApiResponse;
import com.example.Back_End.dto.response.UserResponse;
import com.example.Back_End.entity.User;
import com.example.Back_End.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    UserService userService;


    @PostMapping()
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping
    ApiResponse<List<UserResponse>> getAllUsers() {
        ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.getAllUsers());
        return apiResponse;
    }

    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUserByid(@PathVariable("userId") String userId) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getUserById(userId));
        return apiResponse;
    }

    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable("userId") String userId, @RequestBody @Valid UserUpdateRequest request) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.updateUser(userId, request));
        return apiResponse;
    }

    @DeleteMapping("/{userId}")
    ApiResponse deleteUser(@PathVariable("userId") String userId) {
        ApiResponse apiResponse = new ApiResponse<>();
        apiResponse.setMessage("User deleted successfully");
        userService.deleteUser(userId);
        return apiResponse;
    }
}
