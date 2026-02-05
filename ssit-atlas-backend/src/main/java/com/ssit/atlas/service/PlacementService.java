package com.ssit.atlas.service;

import com.ssit.atlas.model.PlacementRecord;
import com.ssit.atlas.repository.PlacementRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlacementService {

    private final PlacementRecordRepository placementRepository;

    public PlacementService(PlacementRecordRepository placementRepository) {
        this.placementRepository = placementRepository;
    }

    public PlacementRecord createPlacementRecord(PlacementRecord record) {
        record.setCreatedAt(LocalDateTime.now());
        return placementRepository.save(record);
    }

    public PlacementRecord updatePlacementRecord(String id, PlacementRecord recordDetails) {
        return placementRepository.findById(id).map(record -> {
            record.setStudentName(recordDetails.getStudentName());
            record.setStudentUsn(recordDetails.getStudentUsn());
            record.setStudentPhotoUrl(recordDetails.getStudentPhotoUrl());
            record.setCompanyName(recordDetails.getCompanyName());
            record.setCompanyLogoUrl(recordDetails.getCompanyLogoUrl());
            record.setJobRole(recordDetails.getJobRole());
            record.setPackageAmount(recordDetails.getPackageAmount());
            record.setPackageType(recordDetails.getPackageType());
            record.setPlacementDate(recordDetails.getPlacementDate());
            record.setLocation(recordDetails.getLocation());
            record.setTestimonial(recordDetails.getTestimonial());
            record.setInterviewExperience(recordDetails.getInterviewExperience());
            record.setApproved(recordDetails.isApproved());
            return placementRepository.save(record);
        }).orElseThrow(() -> new RuntimeException("Placement record not found"));
    }

    public void deletePlacementRecord(String id) {
        placementRepository.deleteById(id);
    }

    public List<PlacementRecord> getPlacementsByDepartment(String department) {
        return placementRepository.findByDepartmentOrderByPlacementDateDesc(department);
    }

    public List<PlacementRecord> getPlacementsByYear(String academicYear) {
        return placementRepository.findByAcademicYearOrderByPackageAmountDesc(academicYear);
    }

    public List<PlacementRecord> searchByCompany(String companyName) {
        return placementRepository.findByCompanyNameContainingIgnoreCase(companyName);
    }

    public PlacementRecord getPlacementById(String id) {
        return placementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement record not found with id: " + id));
    }
}
