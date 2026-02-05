package com.ssit.atlas.service;

import com.ssit.atlas.dto.AuthRequest;
import com.ssit.atlas.dto.AuthResponse;
import com.ssit.atlas.dto.RegisterRequest;
import com.ssit.atlas.dto.UserResponse;
import com.ssit.atlas.model.User;
import com.ssit.atlas.repository.UserRepository;
import com.ssit.atlas.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtils jwtUtils;
        private final AuthenticationManager authenticationManager;

        public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils,
                        AuthenticationManager authenticationManager) {
                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtUtils = jwtUtils;
                this.authenticationManager = authenticationManager;
        }

        public AuthResponse register(RegisterRequest request) {
                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .passwordHash(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole() != null ? request.getRole() : User.Role.STUDENT)
                                .department(request.getDepartment())
                                .phoneNumber(request.getPhoneNumber())
                                .createdAt(LocalDateTime.now())
                                .build();

                userRepository.save(user); // Ideally handle email uniqueness exception here

                // For security, maybe don't return token immediately, but for this task we can
                // Or just let them login. But standard is often return token.
                // Let's create a UserDetails equivalent or just simple:

                var userDetails = org.springframework.security.core.userdetails.User
                                .withUsername(user.getEmail())
                                .password(user.getPasswordHash())
                                .roles(user.getRole().name())
                                .build();

                var jwtToken = jwtUtils.generateToken(userDetails);
                return AuthResponse.builder().token(jwtToken).build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();

                var userDetails = org.springframework.security.core.userdetails.User
                                .withUsername(user.getEmail())
                                .password(user.getPasswordHash())
                                .roles(user.getRole().name())
                                .build();

                var jwtToken = jwtUtils.generateToken(userDetails);
                return AuthResponse.builder().token(jwtToken).build();
        }

        public UserResponse getCurrentUser(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                return new UserResponse(user);
        }
}
