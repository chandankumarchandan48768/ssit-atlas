package com.ssit.atlas.service;

import com.ssit.atlas.model.AuditLog;
import com.ssit.atlas.repository.AuditLogRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void logAction(String action, String performedBy, String details) {
        AuditLog log = new AuditLog(action, performedBy, details);
        auditLogRepository.save(log);
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }
}
