package com.example.Back_End.dto.request;

import com.example.Back_End.validator.DobConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 4, message = "USERNAME_INVALID")
    @NotNull(message = "USERNAME_NULL")
    String username;

    @Size(min = 4, message = "PASSWORD_INVALID")
    @NotNull(message = "PASSWORD_NULL")
    String password;

    @NotNull(message = "NAME_NULL")
    String name;

    @DobConstraint(min = 16, message = "INVALID_DOB")
    LocalDate dob;

}
