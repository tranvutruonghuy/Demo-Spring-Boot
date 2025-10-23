package com.example.Back_End.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Size;

import java.lang.annotation.Documented;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD }) //Field - only valid in field
@Retention(RUNTIME) //will be handled when runtime
@Constraint(validatedBy = { DobValidator.class}) //class that will be in charge of this annotation
public @interface DobConstraint {
    String message() default "Invalid date of birth";

    int min();  //handle function

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
