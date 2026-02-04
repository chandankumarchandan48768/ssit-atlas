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
        public void run(String... args) throws Exception {
                if (userRepository.existsByEmail("admin@ssit.edu.in")) {
                        return; // Data already seeded
                }

                // 1. Create User
                User admin = User.builder()
                                .name("Admin User")
                                .email("admin@ssit.edu.in")
                                .passwordHash(passwordEncoder.encode("admin123"))
                                .role(User.Role.ADMIN)
                                .createdAt(LocalDateTime.now())
                                .build();
                userRepository.save(admin);

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

                // 4. Create Graph Nodes
                GraphNode entryNode = GraphNode.builder()
                                .buildingId(mainBlock.getId())
                                .label("Main Entrance")
                                .type(GraphNode.NodeType.ENTRY_EXIT)
                                .coordinates(Arrays.asList(13.34, 77.12)) // Dummy coords
                                .build();
                entryNode = nodeRepository.save(entryNode);

                GraphNode corridorNode = GraphNode.builder()
                                .buildingId(mainBlock.getId())
                                .label("Corridor 1")
                                .type(GraphNode.NodeType.CORRIDOR)
                                .coordinates(Arrays.asList(13.3401, 77.1201))
                                .build();
                corridorNode = nodeRepository.save(corridorNode);

                GraphNode labNode = GraphNode.builder()
                                .buildingId(mainBlock.getId())
                                .roomId(csaLab.getId())
                                .label("CSA Lab Door")
                                .type(GraphNode.NodeType.ROOM)
                                .coordinates(Arrays.asList(13.3402, 77.1202))
                                .build();
                labNode = nodeRepository.save(labNode);

                // 5. Create Edges
                GraphEdge edge1 = GraphEdge.builder()
                                .fromNodeId(entryNode.getId())
                                .toNodeId(corridorNode.getId())
                                .weight(10.0)
                                .isBidirectional(true)
                                .build();
                edgeRepository.save(edge1);

                GraphEdge edge2 = GraphEdge.builder()
                                .fromNodeId(corridorNode.getId())
                                .toNodeId(labNode.getId())
                                .weight(5.0)
                                .isBidirectional(true)
                                .build();
                edgeRepository.save(edge2);

                // 6. Create Event
                Event techTalk = Event.builder()
                                .title("Future of AI")
                                .description("A talk by industry experts")
                                .buildingId(mainBlock.getId())
                                .roomId(csaLab.getId())
                                .startTime(LocalDateTime.now().plusDays(1))
                                .endTime(LocalDateTime.now().plusDays(1).plusHours(2))
                                .organizer("CSA Dept")
                                .createdByUserId(admin.getId())
                                .build();
                eventRepository.save(techTalk);

                System.out.println("--- SAMPLE DATA SEEDED ---");
        }
}
