package com.ssit.atlas.service;

import com.ssit.atlas.dto.CreateUserRequest;
import com.ssit.atlas.dto.UpdateUserRequest;
import com.ssit.atlas.model.User;
import com.ssit.atlas.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.auditLogService = auditLogService;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(CreateUserRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .department(request.getDepartment())
                .phoneNumber(request.getPhoneNumber())
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();

        user = userRepository.save(user);
        auditLogService.logAction("USER_CREATED", "Admin", "Admin created user: " + user.getEmail());
        return user;
    }

    public User updateUser(String id, UpdateUserRequest request) {
        return userRepository.findById(id).map(user -> {
            if (request.getName() != null) {
                user.setName(request.getName());
            }
            if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
                // Check if new email is already taken by another user
                if (userRepository.existsByEmail(request.getEmail())) {
                    throw new RuntimeException("Email already exists");
                }
                user.setEmail(request.getEmail());
            }
            if (request.getRole() != null) {
                user.setRole(request.getRole());
            }
            if (request.getDepartment() != null) {
                user.setDepartment(request.getDepartment());
            }
            if (request.getPhoneNumber() != null) {
                user.setPhoneNumber(request.getPhoneNumber());
            }
            if (request.getIsActive() != null) {
                user.setActive(request.getIsActive());
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User toggleUserStatus(String id) {
        return userRepository.findById(id).map(user -> {
            user.setActive(!user.isActive());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
        auditLogService.logAction("USER_DELETED", "Admin", "Admin deleted user ID: " + id);
    }
}
