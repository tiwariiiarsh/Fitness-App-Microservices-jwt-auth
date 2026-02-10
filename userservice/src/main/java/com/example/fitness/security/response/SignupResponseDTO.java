package com.example.fitness.security.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupResponseDTO {
    private String userId;
    private String message;
}
