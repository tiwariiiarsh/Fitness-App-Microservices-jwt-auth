package com.example.fitness.repository;

import com.example.fitness.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName); // ✅ EXACT MATCH

    boolean existsByEmail(String email);

    boolean existsByUserName(String userName);
}
