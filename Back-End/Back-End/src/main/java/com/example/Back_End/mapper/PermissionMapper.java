package com.example.Back_End.mapper;


import com.example.Back_End.dto.request.PermissionRequest;
import com.example.Back_End.dto.response.PermissionResponse;
import com.example.Back_End.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring") //Inform mapstruct: generate mapper to use in spring (dependency injection)
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(Permission permission);
 }
