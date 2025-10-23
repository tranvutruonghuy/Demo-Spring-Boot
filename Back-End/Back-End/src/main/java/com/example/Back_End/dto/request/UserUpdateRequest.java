package com.example.Back_End.dto.request;

import com.example.Back_End.validator.DobConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {

    @Size(min = 8, message = "PASSWORD_INVALID")
    @NotNull(message = "PASSWORD_NULL")
    String password;
    String name;
    @DobConstraint(min = 2, message = "INVALID_DOB")
    LocalDate dob;
    List<String> roles;

}
