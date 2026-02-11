package com.ssit.atlas.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.ssit.atlas.model.User;

import java.io.IOException;

public class RoleDeserializer extends JsonDeserializer<User.Role> {
    @Override
    public User.Role deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String value = p.getText();
        if (value == null || value.isEmpty()) {
            return User.Role.STUDENT;
        }
        
        try {
            // Try exact match first
            return User.Role.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            // Log the invalid role and return default
            System.err.println("Invalid role: " + value + ", defaulting to STUDENT");
            return User.Role.STUDENT;
        }
    }
}
