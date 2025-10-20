package com.example.Back_End.mapper;


import com.example.Back_End.dto.request.UserCreationRequest;
import com.example.Back_End.dto.request.UserUpdateRequest;
import com.example.Back_End.dto.response.UserResponse;
import com.example.Back_End.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring") //Inform mapstruct: generate mapper to use in spring (dependency injection)
public interface UserMapper {
    User toUser(UserCreationRequest request);
    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
 }
