package com.example.fitness.service;

import com.example.fitness.dto.AuthResponse;
import com.example.fitness.dto.LoginRequest;
import com.example.fitness.dto.RegisterRequest;
import com.example.fitness.dto.UserResponse;
import com.example.fitness.model.User;
import com.example.fitness.model.UserRole;
import com.example.fitness.repository.UserRepository;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTservice jwtService;

    // REGISTER
    public UserResponse save(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUserName(request.getUserName());
        user.setRole(UserRole.USER);
        user.setCreatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        return new UserResponse(
                saved.getId(),
                saved.getEmail(),
                saved.getUserName(),
                saved.getCreatedAt()
        );
    }

    // ✅ LOGIN (EMAIL + PASSWORD)
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getId());
        return new AuthResponse(token, user.getId());
    }



    // ✅ TOKEN VALIDATE (IMPORTANT FOR GATEWAY)
    public Claims validateToken(String token) {
        return jwtService.validateToken(token);
    }
}
