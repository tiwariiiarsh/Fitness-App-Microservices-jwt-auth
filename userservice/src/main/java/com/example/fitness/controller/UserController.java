package com.example.fitness.controller;


import com.example.fitness.dto.AuthResponse;
import com.example.fitness.dto.LoginRequest;
import com.example.fitness.dto.RegisterRequest;
import com.example.fitness.dto.UserResponse;
import com.example.fitness.model.User;
import com.example.fitness.service.AuthService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody RegisterRequest user){
        return authService.save(user);
    }

    @PostMapping("/login")
    public AuthResponse getToken(@RequestBody LoginRequest user) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        if (authenticate.isAuthenticated()){
            return authService.login(user);
        }else{
            throw new RuntimeException("invalid access");
        }
    }


//    @GetMapping("/validate")
//    public String validateToken(@RequestHeader("Authorization") String authHeader) {
//        String token = authHeader.replace("Bearer ", "").trim();
//        authService.validateToken(token);
//        return "token is valid";
//    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
        return "Token is valid";
    }

}
