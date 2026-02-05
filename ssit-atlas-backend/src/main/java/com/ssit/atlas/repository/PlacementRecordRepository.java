package com.ssit.atlas.repository;

import com.ssit.atlas.model.PlacementRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementRecordRepository extends MongoRepository<PlacementRecord, String> {
    List<PlacementRecord> findByDepartmentOrderByPlacementDateDesc(String department);

    List<PlacementRecord> findByAcademicYearOrderByPackageAmountDesc(String academicYear);

    List<PlacementRecord> findByCompanyNameContainingIgnoreCase(String companyName);

    long countByAcademicYearAndDepartment(String academicYear, String department);
}
