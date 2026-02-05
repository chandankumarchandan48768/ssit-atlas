package com.ssit.atlas.repository;

import com.ssit.atlas.model.Notice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NoticeRepository extends MongoRepository<Notice, String> {
    List<Notice> findByDepartmentOrderByCreatedAtDesc(String department);

    List<Notice> findByDepartmentAndTargetAudience(String department, Notice.TargetAudience targetAudience);

    List<Notice> findByIsPinnedTrueOrderByCreatedAtDesc();

    List<Notice> findByExpiryDateAfter(LocalDateTime now);
}
