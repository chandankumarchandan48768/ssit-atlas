package com.ssit.atlas.security;

import com.ssit.atlas.model.User;
import com.ssit.atlas.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return buildUserDetails(user);
    }

    public UserDetails loadUserById(String userId) throws UsernameNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));

        return buildUserDetails(user);
    }

    private UserDetails buildUserDetails(User user) {
        // Handle null or invalid role
        User.Role role = user.getRole();
        if (role == null) {
            role = User.Role.STUDENT;
            user.setRole(role);
            userRepository.save(user);
        }

        // Use user ID as the username/principal to maintain consistency with friend service
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getId())
                .password(user.getPasswordHash())
                .roles(role.name())
                .build();
    }
}


