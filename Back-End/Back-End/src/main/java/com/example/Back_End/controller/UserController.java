package com.example.Back_End.controller;

import com.example.Back_End.dto.request.UserCreationRequest;
import com.example.Back_End.entity.User;
import com.example.Back_End.repository.UserRepository;
import com.example.Back_End.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping()
    public User createUser(@RequestBody UserCreationRequest userCreationRequest) {
        return userService.createUser(userCreationRequest);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
