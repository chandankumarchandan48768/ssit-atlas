package com.ssit.atlas.service;

import com.ssit.atlas.model.Event;
import com.ssit.atlas.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final AuditLogService auditLogService;

    public EventService(EventRepository eventRepository, AuditLogService auditLogService) {
        this.eventRepository = eventRepository;
        this.auditLogService = auditLogService;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getUpcomingEvents() {
        return eventRepository.findByStartTimeAfter(java.time.LocalDateTime.now());
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        event = eventRepository.save(event);
        auditLogService.logAction("EVENT_CREATED", "Admin", "New event created: " + event.getTitle());
        return event;
    }

    public Event updateEvent(String id, Event updatedEvent) {
        updatedEvent.setId(id);
        return eventRepository.save(updatedEvent);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
