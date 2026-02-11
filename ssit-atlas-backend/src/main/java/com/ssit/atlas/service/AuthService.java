package com.ssit.atlas.service;

import com.ssit.atlas.dto.AuthRequest;
import com.ssit.atlas.dto.AuthResponse;
import com.ssit.atlas.dto.RegisterRequest;
import com.ssit.atlas.dto.UserResponse;
import com.ssit.atlas.exception.AuthenticationFailedException;
import com.ssit.atlas.exception.ResourceAlreadyExistsException;
import com.ssit.atlas.model.User;
import com.ssit.atlas.repository.UserRepository;
import com.ssit.atlas.security.CustomUserDetailsService;
import com.ssit.atlas.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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
        private final CustomUserDetailsService userDetailsService;

        public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils,
                        AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService) {
                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtUtils = jwtUtils;
                this.authenticationManager = authenticationManager;
                this.userDetailsService = userDetailsService;
        }

        public AuthResponse register(RegisterRequest request) {
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new ResourceAlreadyExistsException("Email already registered");
                }

                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .passwordHash(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole() != null ? request.getRole() : User.Role.STUDENT)
                                .department(request.getDepartment())
                                .phoneNumber(request.getPhoneNumber())
                                .createdAt(LocalDateTime.now())
                                .build();

                userRepository.save(user);

                var userDetails = userDetailsService.loadUserById(user.getId());
                var jwtToken = jwtUtils.generateToken(userDetails);
                return AuthResponse.builder().token(jwtToken).build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                try {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(
                                                        request.getEmail(),
                                                        request.getPassword()));
                } catch (BadCredentialsException e) {
                        throw new AuthenticationFailedException("Invalid email or password");
                } catch (Exception e) {
                        throw new AuthenticationFailedException("Authentication failed: " + e.getMessage());
                }

                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new AuthenticationFailedException("User not found"));

                var userDetails = userDetailsService.loadUserById(user.getId());
                var jwtToken = jwtUtils.generateToken(userDetails);
                return AuthResponse.builder().token(jwtToken).build();
        }

        public UserResponse getCurrentUser(String userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                return new UserResponse(user);
        }
}
