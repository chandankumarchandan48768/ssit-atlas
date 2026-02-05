# Phase 1 Implementation Plan: Role System Overhaul & Core Features

## Goal

Transform SSIT Atlas from a basic 3-role system to a comprehensive 7-role campus management platform with specialized permissions and new features for Notice Board, Enhanced Placement System, and Event Management with rich media support.

## User Review Required

> [!IMPORTANT]
> **Breaking Changes**: The User role enum will be expanded from 3 to 7 roles. Existing users in the database will need their roles validated. Admin should reassign roles after deployment.

> [!WARNING]
> **Database Migration**: New fields will be added to existing models. Ensure MongoDB is backed up before deployment.

## Proposed Changes

### Backend Models

#### [MODIFY] [User.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/model/User.java)

**Changes:**
- Expand `Role` enum from 3 to 7 roles:
  - `STUDENT` (existing)
  - `FACULTY` (existing)
  - `ADMIN` (existing)
  - `CULTURAL_COMMITTEE` (new) - for event management
  - `MANAGEMENT_TEAM` (new) - for building/infrastructure
  - `PLACEMENT_DEPARTMENT` (new) - for placement activities
  - `HOD` (new) - for department-specific content
- Add `department` field (String, optional) - required for HOD role
- Add `phoneNumber` field (String, optional)
- Add `isActive` field (Boolean, default: true) - for admin to deactivate users

---

#### [NEW] [Notice.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/model/Notice.java)

**Purpose:** Enable HODs to post department notices, memos, and circulars

**Fields:**
- `id` (String) - MongoDB ID
- `title` (String, required)
- `content` (String, required)
- `noticeType` (Enum: MEMO, CIRCULAR, NOTICE, ANNOUNCEMENT)
- `priority` (Enum: EMERGENCY, IMPORTANT, NORMAL, FYI)
- `department` (String, required) - CSE, ISE, ECE, etc.
- `createdByUserId` (String, required) - HOD user ID
- `attachmentUrls` (List<String>) - PDF/image URLs
- `targetAudience` (Enum: ALL, FACULTY, STUDENTS)
- `expiryDate` (LocalDateTime, optional) - auto-hide after this date
- `viewedByUserIds` (List<String>) - track who viewed (for read receipts)
- `isPinned` (Boolean, default: false)
- `createdAt` (LocalDateTime)
- `updatedAt` (LocalDateTime)

---

#### [NEW] [PlacementRecord.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/model/PlacementRecord.java)

**Purpose:** Track individual student placements

**Fields:**
- `id` (String)
- `studentName` (String, required)
- `studentUsn` (String, required)
- `studentPhotoUrl` (String)
- `department` (String, required)
- `companyName` (String, required)
- `companyLogoUrl` (String)
- `jobRole` (String, required)
- `packageAmount` (Double, required) - in LPA
- `packageType` (Enum: CTC, IN_HAND, STIPEND)
- `placementDate` (LocalDateTime, required)
- `location` (String) - job location
- `testimonial` (String) - student's experience/quote
- `interviewExperience` (String) - optional detailed experience
- `createdByUserId` (String) - placement department user
- `academicYear` (String) - "2024-25"
- `isApproved` (Boolean, default: true)
- `createdAt` (LocalDateTime)

---

#### [MODIFY] [Event.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/model/Event.java)

**Changes:**
- Add `brochureUrl` (String) - PDF/image URL for event brochure
- Add `posterUrl` (String) - image URL for event poster
- Add `capacity` (Integer) - max attendees
- Add `registeredUserIds` (List<String>) - users who RSVP'd
- Add `eventType` (Enum: CULTURAL, TECHNICAL, SPORTS, WORKSHOP, SEMINAR, OTHER)
- Add `registrationRequired` (Boolean, default: false)
- Add `registrationDeadline` (LocalDateTime)
- Add `contactEmail` (String)
- Add `contactPhone` (String)

---

### Repositories

#### [NEW] [NoticeRepository.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/repository/NoticeRepository.java)

**Methods:**
- `findByDepartmentOrderByCreatedAtDesc(String department)`
- `findByDepartmentAndTargetAudience(String department, Notice.TargetAudience audience)`
- `findByIsPinnedTrueOrderByCreatedAtDesc()`
- `findByExpiryDateAfter(LocalDateTime now)`

---

#### [NEW] [PlacementRecordRepository.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/repository/PlacementRecordRepository.java)

**Methods:**
- `findByDepartmentOrderByPlacementDateDesc(String department)`
- `findByAcademicYearOrderByPackageAmountDesc(String academicYear)`
- `findByCompanyNameContainingIgnoreCase(String companyName)`
- `countByAcademicYearAndDepartment(String academicYear, String department)`

---

### Services

#### [NEW] [NoticeService.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/service/NoticeService.java)

**Methods:**
- `createNotice(Notice notice, String userId)` - verify user is HOD of same department
- `updateNotice(String id, Notice notice, String userId)` - verify ownership
- `deleteNotice(String id, String userId)` - verify ownership
- `getNoticesByDepartment(String department)`
- `markNoticeAsViewed(String noticeId, String userId)` - add to viewedByUserIds
- `getPinnedNotices()`

---

#### [NEW] [PlacementService.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/service/PlacementService.java)

**Methods:**
- `createPlacementRecord(PlacementRecord record, String userId)` - verify placement dept role
- `updatePlacementRecord(String id, PlacementRecord record, String userId)`
- `deletePlacementRecord(String id, String userId)`
- `getPlacementsByDepartment(String department)`
- `getPlacementsByYear(String academicYear)`
- `getPlacementStats(String academicYear)` - return aggregated statistics
- `searchByCompany(String companyName)`

---

### Controllers

#### [NEW] [NoticeController.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/controller/NoticeController.java)

**Endpoints:**
- `POST /api/notices` - Create notice (HOD only)
- `PUT /api/notices/{id}` - Update notice (HOD only, same department)
- `DELETE /api/notices/{id}` - Delete notice (HOD or ADMIN)
- `GET /api/notices/department/{dept}` - Get all notices for department (public)
- `GET /api/notices/pinned` - Get pinned notices (public)
- `POST /api/notices/{id}/view` - Mark notice as viewed (authenticated users)

**Security:**
- Create/Update: `@PreAuthorize("hasAnyRole('HOD', 'ADMIN')")`
- Delete: `@PreAuthorize("hasAnyRole('HOD', 'ADMIN')")`
- Read: Public access

---

#### [NEW] [PlacementController.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/controller/PlacementController.java)

**Endpoints:**
- `POST /api/placements` - Create placement record (PLACEMENT_DEPARTMENT or ADMIN)
- `PUT /api/placements/{id}` - Update record
- `DELETE /api/placements/{id}` - Delete record
- `GET /api/placements/department/{dept}` - Get by department (public)
- `GET /api/placements/year/{year}` - Get by academic year (public)
- `GET /api/placements/stats/{year}` - Get statistics (public)
- `GET /api/placements/search?company={name}` - Search by company (public)

**Security:**
- Create/Update/Delete: `@PreAuthorize("hasAnyRole('PLACEMENT_DEPARTMENT', 'ADMIN')")`
- Read: Public access

---

#### [MODIFY] [EventController.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/controller/EventController.java)

**Permission Updates:**
- Create event: `@PreAuthorize("hasAnyRole('CULTURAL_COMMITTEE', 'HOD', 'ADMIN')")`
- Update event: `@PreAuthorize("hasAnyRole('CULTURAL_COMMITTEE', 'HOD', 'ADMIN')")`
- Delete event: `@PreAuthorize("hasAnyRole('CULTURAL_COMMITTEE', 'ADMIN')")`

**New Endpoints:**
- `POST /api/events/{id}/register` - RSVP to event (authenticated users)
- `DELETE /api/events/{id}/register` - Cancel RSVP
- `GET /api/events/{id}/attendees` - Get registered users (event creator or admin)

---

#### [MODIFY] [BuildingController.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/controller/BuildingController.java)

**Permission Updates:**
- Create building: `@PreAuthorize("hasAnyRole('MANAGEMENT_TEAM', 'ADMIN')")`
- Update building: `@PreAuthorize("hasAnyRole('MANAGEMENT_TEAM', 'ADMIN')")`
- Delete building: `@PreAuthorize("hasRole('ADMIN')")` - only admin can delete

---

#### [MODIFY] [AchievementController.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/controller/AchievementController.java)

**Permission Updates:**
- Create achievement: `@PreAuthorize("hasAnyRole('HOD', 'FACULTY', 'ADMIN')")`
- Department field validation: HOD can only post for their department

---

### Data Seeding

#### [MODIFY] [DataSeeder.java](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-backend/src/main/java/com/ssit/atlas/config/DataSeeder.java)

**Add Sample Users for All Roles:**
1. Admin user (existing)
2. Cultural Committee member (`cultural@ssit.edu.in`)
3. Management Team member (`management@ssit.edu.in`)
4. Placement Department (`placement@ssit.edu.in`)
5. HOD CSE (`hod.cse@ssit.edu.in`, department: "CSE")
6. HOD ISE (`hod.ise@ssit.edu.in`, department: "ISE")
7. Faculty member (`faculty@ssit.edu.in`)
8. Student user (`student@ssit.edu.in`)

**Add Sample Data:**
- 2-3 sample notices (CSE department)
- 3-4 placement records (different departments)
- 1-2 events with brochures/posters

---

### Frontend Updates

#### [MODIFY] [Register.jsx](file:///Users/chandankumar/Desktop/Final-project/ssit-atlas-frontend/src/pages/Register.jsx)

**Changes:**
- Update role dropdown to include all 7 roles
- Add department input field (shown only when HOD is selected)
- Add phone number field

---

#### [NEW] Dashboard Components

Create role-specific dashboard pages:
- `AdminDashboard.jsx` - System monitoring, user management
- `CulturalDashboard.jsx` - Event management, RSVP tracking
- `ManagementDashboard.jsx` - Building/room management
- `PlacementDashboard.jsx` - Placement records, statistics
- `HODDashboard.jsx` - Department notices, achievements
- `FacultyDashboard.jsx` - Personal achievements, department events
- `StudentDashboard.jsx` - View events, notices, placements

---

## Verification Plan

### Automated Tests

```bash
# Backend tests
cd ssit-atlas-backend
./mvnw test

# Test role-based access control
# Test HOD can only access their department
# Test Cultural Committee can create events
# Test Placement Department can create placement records
# Test Management Team can create buildings
```

### Manual Verification

1. **User Registration & Login**
   - Register users with different roles
   - Verify department field required for HOD
   - Login as each role

2. **Notice Board (HOD)**
   - Login as HOD
   - Create notice with PDF attachment
   - Verify only same department notices editable
   - Pin/unpin notices
   - Check read receipts

3. **Placement System**
   - Login as Placement Department
   - Create placement record with student details
   - Upload company logo, student photo
   - View placement statistics
   - Search by company name

4. **Event Management (Cultural Committee)**
   - Login as Cultural Committee
   - Create event with brochure and poster
   - Set capacity and registration deadline
   - View registered attendees

5. **Building Management (Management Team)**
   - Login as Management Team
   - Create/update building with metadata
   - Add rooms and floors
   - Update 3D coordinates

6. **Admin Monitoring**
   - Login as Admin
   - View all activities across modules
   - Manage user roles
   - Override permissions if needed

7. **Frontend Role-Specific Dashboards**
   - Verify each role sees appropriate dashboard
   - Check permissions enforced on UI
   - Test mobile responsiveness

---

## Database Migration Notes

> [!CAUTION]
> Before deploying, backup MongoDB database:
> ```bash
> mongodump --uri="mongodb://localhost:27017/ssit_atlas" --out=/backup/$(date +%Y%m%d)
> ```

**Post-Deployment Tasks:**
1. Update existing user roles via admin panel
2. Assign departments to HOD accounts
3. Import historical placement data (if available)
4. Configure file upload limits for brochures/posters

---

## Estimated Timeline

- Backend Models & Repositories: **2-3 hours**
- Services & Controllers: **3-4 hours**
- Security Configuration: **1 hour**
- Data Seeding: **1 hour**
- Frontend Updates: **4-5 hours**
- Testing & Bug Fixes: **2-3 hours**

**Total: 13-17 hours** (Approximately 2-3 working days)

---

## Next Phase Preview

After Phase 1 completion, Phase 2 will include:
- AI Campus Assistant (Gemini integration)
- Push Notifications system
- File upload to cloud storage (AWS S3/Cloudflare R2)
- Enhanced analytics dashboard
- Event calendar with Google Calendar sync
