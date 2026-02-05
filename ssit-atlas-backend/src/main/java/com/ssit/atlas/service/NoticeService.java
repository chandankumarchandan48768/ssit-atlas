package com.ssit.atlas.service;

import com.ssit.atlas.model.Notice;
import com.ssit.atlas.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public Notice createNotice(Notice notice) {
        notice.setCreatedAt(LocalDateTime.now());
        notice.setUpdatedAt(LocalDateTime.now());
        return noticeRepository.save(notice);
    }

    public Notice updateNotice(String id, Notice noticeDetails) {
        return noticeRepository.findById(id).map(notice -> {
            notice.setTitle(noticeDetails.getTitle());
            notice.setContent(noticeDetails.getContent());
            notice.setNoticeType(noticeDetails.getNoticeType());
            notice.setPriority(noticeDetails.getPriority());
            notice.setAttachmentUrls(noticeDetails.getAttachmentUrls());
            notice.setTargetAudience(noticeDetails.getTargetAudience());
            notice.setExpiryDate(noticeDetails.getExpiryDate());
            notice.setPinned(noticeDetails.isPinned());
            notice.setUpdatedAt(LocalDateTime.now());
            return noticeRepository.save(notice);
        }).orElseThrow(() -> new RuntimeException("Notice not found"));
    }

    public void deleteNotice(String id) {
        noticeRepository.deleteById(id);
    }

    public List<Notice> getNoticesByDepartment(String department) {
        return noticeRepository.findByDepartmentOrderByCreatedAtDesc(department);
    }

    public List<Notice> getPinnedNotices() {
        return noticeRepository.findByIsPinnedTrueOrderByCreatedAtDesc();
    }

    public Notice getNoticeById(String id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found with id: " + id));
    }

    public void markNoticeAsViewed(String noticeId, String userId) {
        Notice notice = getNoticeById(noticeId);
        List<String> viewedBy = notice.getViewedByUserIds();
        if (viewedBy == null) {
            viewedBy = new java.util.ArrayList<>();
        }
        if (!viewedBy.contains(userId)) {
            viewedBy.add(userId);
            notice.setViewedByUserIds(viewedBy);
            noticeRepository.save(notice);
        }
    }
}
