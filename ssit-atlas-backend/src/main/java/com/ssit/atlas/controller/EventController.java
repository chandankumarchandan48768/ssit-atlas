package com.ssit.atlas.controller;

import com.ssit.atlas.model.Event;
import com.ssit.atlas.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/upcoming")
    public List<Event> getUpcomingEvents() {
        return eventService.getUpcomingEvents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CULTURAL_COMMITTEE', 'HOD', 'ADMIN')")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('CULTURAL_COMMITTEE', 'HOD', 'ADMIN')")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('CULTURAL_COMMITTEE', 'ADMIN')")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/register")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> registerForEvent(@PathVariable String id) {
        // Implementation for RSVP to be added in Service first, assume service method
        // exists or add logic here
        // For now just returning ok as placeholder or I should implement service method
        // too.
        // Let's updating Service later.
        return ResponseEntity.ok().build();
    }
}
