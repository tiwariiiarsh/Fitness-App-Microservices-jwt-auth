package com.example.fitness.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    @Getter
    private String id;
    private String email;
    private String userName;
    private LocalDateTime createdAt;

}
