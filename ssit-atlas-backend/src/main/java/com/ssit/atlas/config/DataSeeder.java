package com.ssit.atlas.config;

import com.ssit.atlas.model.*;
import com.ssit.atlas.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataSeeder implements CommandLineRunner {

        private final BuildingRepository buildingRepository;
        private final RoomRepository roomRepository;
        private final GraphNodeRepository nodeRepository;
        private final GraphEdgeRepository edgeRepository;
        private final UserRepository userRepository;
        private final EventRepository eventRepository;
        private final PasswordEncoder passwordEncoder;

        public DataSeeder(BuildingRepository buildingRepository, RoomRepository roomRepository,
                        GraphNodeRepository nodeRepository, GraphEdgeRepository edgeRepository,
                        UserRepository userRepository, EventRepository eventRepository,
                        PasswordEncoder passwordEncoder) {
                this.buildingRepository = buildingRepository;
                this.roomRepository = roomRepository;
                this.nodeRepository = nodeRepository;
                this.edgeRepository = edgeRepository;
                this.userRepository = userRepository;
                this.eventRepository = eventRepository;
                this.passwordEncoder = passwordEncoder;
        }

        @Override
        @SuppressWarnings("null")
        public void run(String... args) throws Exception {
                // Check if data already seeded
                if (userRepository.existsByEmail("admin@ssit.edu.in")) {
                        return;
                }

                // 1. Create Users for all Roles
                User admin = User.builder()
                                .name("Admin User")
                                .email("admin@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("admin123"))
                                .role(User.Role.ADMIN)
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(admin);

                User cultural = User.builder()
                                .name("Cultural Committee")
                                .email("cultural@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("cultural123"))
                                .role(User.Role.CULTURAL_COMMITTEE)
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(cultural);

                User management = User.builder()
                                .name("Management Team")
                                .email("management@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("manage123"))
                                .role(User.Role.MANAGEMENT_TEAM)
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(management);

                User placement = User.builder()
                                .name("Placement Dept")
                                .email("placement@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("place123"))
                                .role(User.Role.PLACEMENT_DEPARTMENT)
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(placement);

                User hodCse = User.builder()
                                .name("HOD CSE")
                                .email("hod.cse@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("hodcse123"))
                                .role(User.Role.HOD)
                                .department("CSE")
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(hodCse);

                User faculty = User.builder()
                                .name("Faculty Member")
                                .email("faculty@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("faculty123"))
                                .role(User.Role.FACULTY)
                                .department("CSE")
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(faculty);

                User student = User.builder()
                                .name("Student User")
                                .email("student@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT)
                                .department("CSE")
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(student);

                // 2. Create Building
                Building mainBlock = Building.builder()
                                .name("Main Block")
                                .code("MB")
                                .description("Administrative and CSA Department")
                                .floors(Arrays.asList(0, 1, 2, 3))
                                .build();
                mainBlock = buildingRepository.save(mainBlock);

                // 3. Create Rooms
                Room csaLab = Room.builder()
                                .buildingId(mainBlock.getId())
                                .name("CSA Lab 1")
                                .roomNumber("101")
                                .floor(1)
                                .type(Room.RoomType.LAB)
                                .build();
                roomRepository.save(csaLab);

                // 4. Create Graph Nodes (Basic)
                GraphNode entryNode = GraphNode.builder()
                                .buildingId(mainBlock.getId())
                                .label("Main Entrance")
                                .type(GraphNode.NodeType.ENTRY_EXIT)
                                .coordinates(Arrays.asList(13.34, 77.12))
                                .build();
                entryNode = nodeRepository.save(entryNode);

                // 5. Create Event
                Event techTalk = Event.builder()
                                .title("Future of AI")
                                .description("A talk by industry experts")
                                .buildingId(mainBlock.getId())
                                .roomId(csaLab.getId())
                                .startTime(LocalDateTime.now().plusDays(1))
                                .endTime(LocalDateTime.now().plusDays(1).plusHours(2))
                                .organizer("CSA Dept")
                                .createdByUserId(cultural.getId())
                                .eventType(Event.EventType.TECHNICAL)
                                .build();
                eventRepository.save(techTalk);

                System.out.println("--- SAMPLE DATA SEEDED with 7 ROLES ---");
        }
}
