package com.ssit.atlas.controller;

import com.ssit.atlas.model.Notice;
import com.ssit.atlas.model.User;
import com.ssit.atlas.service.NoticeService;
import com.ssit.atlas.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;
    private final UserRepository userRepository;

    public NoticeController(NoticeService noticeService, UserRepository userRepository) {
        this.noticeService = noticeService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('HOD', 'ADMIN')")
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElseThrow();

        // If HOD, force department match
        if (currentUser.getRole() == User.Role.HOD) {
            if (currentUser.getDepartment() == null || !currentUser.getDepartment().equals(notice.getDepartment())) {
                return ResponseEntity.status(403).build();
            }
        }

        notice.setCreatedByUserId(currentUser.getId());
        return ResponseEntity.ok(noticeService.createNotice(notice));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('HOD', 'ADMIN')")
    public ResponseEntity<Notice> updateNotice(@PathVariable String id, @RequestBody Notice notice) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElseThrow();

        Notice existingNotice = noticeService.getNoticeById(id);

        // If HOD, ensure they own the notice (same department)
        if (currentUser.getRole() == User.Role.HOD) {
            if (!currentUser.getDepartment().equals(existingNotice.getDepartment())) {
                return ResponseEntity.status(403).build();
            }
        }

        return ResponseEntity.ok(noticeService.updateNotice(id, notice));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('HOD', 'ADMIN')")
    public ResponseEntity<Void> deleteNotice(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElseThrow();

        Notice existingNotice = noticeService.getNoticeById(id);

        if (currentUser.getRole() == User.Role.HOD) {
            if (!currentUser.getDepartment().equals(existingNotice.getDepartment())) {
                return ResponseEntity.status(403).build();
            }
        }

        noticeService.deleteNotice(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/department/{department}")
    public ResponseEntity<List<Notice>> getNoticesByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(noticeService.getNoticesByDepartment(department));
    }

    @GetMapping("/pinned")
    public ResponseEntity<List<Notice>> getPinnedNotices() {
        return ResponseEntity.ok(noticeService.getPinnedNotices());
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<Void> markAsViewed(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElseThrow();
        noticeService.markNoticeAsViewed(id, currentUser.getId());
        return ResponseEntity.ok().build();
    }
}
