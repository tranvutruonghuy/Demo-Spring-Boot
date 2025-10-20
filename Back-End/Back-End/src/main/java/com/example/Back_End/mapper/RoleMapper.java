package com.example.Back_End.mapper;


import com.example.Back_End.dto.request.RoleRequest;
import com.example.Back_End.dto.response.RoleResponse;
import com.example.Back_End.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") //Inform mapstruct: generate mapper to use in spring (dependency injection)
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);
    RoleResponse toRoleResponse(Role role);
 }
