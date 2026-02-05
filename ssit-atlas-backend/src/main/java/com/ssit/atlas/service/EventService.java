package com.ssit.atlas.service;

import com.ssit.atlas.model.Event;
import com.ssit.atlas.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
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
        return eventRepository.save(event);
    }

    public Event updateEvent(String id, Event updatedEvent) {
        updatedEvent.setId(id);
        return eventRepository.save(updatedEvent);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
