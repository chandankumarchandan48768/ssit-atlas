import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Upload, X, User, Mail, Briefcase, GraduationCap, Building2, Award, Shield } from 'lucide-react';

const ProfileForm = ({ profileData, onSave, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        bio: profileData?.bio || '',
        status: profileData?.status || '',
        dateOfBirth: profileData?.dateOfBirth || '',
        gender: profileData?.gender || '',
        enrollmentId: profileData?.enrollmentId || '',
        employeeId: profileData?.employeeId || '',
        semester: profileData?.semester || '',
        yearOfAdmission: profileData?.yearOfAdmission || '',
        rollNumber: profileData?.rollNumber || '',
        designation: profileData?.designation || '',
        specialization: profileData?.specialization || '',
        officeLocation: profileData?.officeLocation || '',
        cabinNumber: profileData?.cabinNumber || '',
        committeeRole: profileData?.committeeRole || '',
        eventResponsibilities: profileData?.eventResponsibilities || [],
        accessLevel: profileData?.accessLevel || '',
        department: profileData?.department || '',
        phoneNumber: profileData?.phoneNumber || '',
    });

    const [photoPreview, setPhotoPreview] = useState(profileData?.profilePhotoUrl ? `http://localhost:8080${profileData.profilePhotoUrl}` : null);
    const [photoFile, setPhotoFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const role = profileData?.role || 'STUDENT';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handlePhotoSelect(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleRemovePhoto = () => {
        setPhotoPreview(null);
        setPhotoFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a copy of formData to sanitize
        const cleanData = { ...formData };

        // Helper to convert empty strings to null and numbers
        const cleanNumber = (value) => {
            if (value === '' || value === null || value === undefined) return null;
            const num = parseInt(value, 10);
            return isNaN(num) ? null : num;
        };

        const cleanString = (value) => {
            if (value === '' || value === null || value === undefined) return null;
            return value.toString().trim() || null;
        };

        // Sanitize numeric fields
        cleanData.semester = cleanNumber(cleanData.semester);
        cleanData.yearOfAdmission = cleanNumber(cleanData.yearOfAdmission);

        // Sanitize all string fields
        const stringFields = [
            'bio', 'status', 'gender', 'phoneNumber',
            'enrollmentId', 'employeeId', 'rollNumber', 'designation',
            'specialization', 'officeLocation', 'cabinNumber',
            'committeeRole', 'accessLevel', 'department'
        ];

        stringFields.forEach(field => {
            cleanData[field] = cleanString(cleanData[field]);
        });

        // Keep dateOfBirth as-is (YYYY-MM-DD format from input type="date")
        // Don't clean it, the date format should be preserved
        if (cleanData.dateOfBirth === '') {
            cleanData.dateOfBirth = null;
        }

        await onSave(cleanData, photoFile);
    };

    const inputClass = "focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none";
    const labelClass = "block text-sm font-medium text-slate-700 dark:text-white mb-2";

    const getRoleSpecificFields = () => {
        switch (role) {
            case 'STUDENT':
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="enrollmentId" className={labelClass}>
                                Enrollment ID *
                            </label>
                            <input
                                type="text"
                                id="enrollmentId"
                                name="enrollmentId"
                                value={formData.enrollmentId}
                                onChange={handleChange}
                                placeholder="Enter enrollment ID"
                                className={inputClass}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="semester" className={labelClass}>
                                Semester *
                            </label>
                            <select
                                id="semester"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Select Semester</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                    <option key={sem} value={sem}>{sem}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="yearOfAdmission" className={labelClass}>
                                Year of Admission
                            </label>
                            <input
                                type="number"
                                id="yearOfAdmission"
                                name="yearOfAdmission"
                                value={formData.yearOfAdmission}
                                onChange={handleChange}
                                placeholder="2023"
                                className={inputClass}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rollNumber" className={labelClass}>
                                Roll Number
                            </label>
                            <input
                                type="text"
                                id="rollNumber"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                placeholder="Enter roll number"
                                className={inputClass}
                            />
                        </div>
                    </>
                );

            case 'FACULTY':
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="employeeId" className={labelClass}>
                                Employee ID *
                            </label>
                            <input
                                type="text"
                                id="employeeId"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                placeholder="Enter employee ID"
                                className={inputClass}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="designation" className={labelClass}>
                                Designation *
                            </label>
                            <select
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Select Designation</option>
                                <option value="Assistant Professor">Assistant Professor</option>
                                <option value="Associate Professor">Associate Professor</option>
                                <option value="Professor">Professor</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="specialization" className={labelClass}>
                                Specialization *
                            </label>
                            <input
                                type="text"
                                id="specialization"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="E.g., Machine Learning, Database Systems"
                                className={inputClass}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="officeLocation" className={labelClass}>
                                Office Location
                            </label>
                            <input
                                type="text"
                                id="officeLocation"
                                name="officeLocation"
                                value={formData.officeLocation}
                                onChange={handleChange}
                                placeholder="Building A, Room 301"
                                className={inputClass}
                            />
                        </div>
                    </>
                );
            // ... (Add other cases if needed, keeping similar structure)
            case 'HOD':
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="employeeId" className={labelClass}>Employee ID *</label>
                            <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Enter employee ID" className={inputClass} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="officeLocation" className={labelClass}>Office Location *</label>
                            <input type="text" id="officeLocation" name="officeLocation" value={formData.officeLocation} onChange={handleChange} placeholder="HOD Office, Main Building" className={inputClass} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cabinNumber" className={labelClass}>Cabin Number</label>
                            <input type="text" id="cabinNumber" name="cabinNumber" value={formData.cabinNumber} onChange={handleChange} placeholder="HOD-101" className={inputClass} />
                        </div>
                    </>
                );
            case 'MANAGEMENT_TEAM':
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="employeeId" className={labelClass}>Employee ID *</label>
                            <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Enter employee ID" className={inputClass} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="designation" className={labelClass}>Designation *</label>
                            <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} placeholder="Principal, Vice Principal, etc." className={inputClass} required />
                        </div>
                    </>
                );
            case 'CULTURAL_COMMITTEE':
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="committeeRole" className={labelClass}>Committee Role *</label>
                            <input type="text" id="committeeRole" name="committeeRole" value={formData.committeeRole} onChange={handleChange} placeholder="Event Coordinator, Secretary, etc." className={inputClass} required />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>ID Type *</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="enrollmentId" className="block text-xs mb-1 text-slate-500">Enrollment ID (If Student)</label>
                                    <input type="text" id="enrollmentId" name="enrollmentId" value={formData.enrollmentId} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label htmlFor="employeeId" className="block text-xs mb-1 text-slate-500">Employee ID (If Faculty)</label>
                                    <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'PLACEMENT_DEPARTMENT':
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="employeeId" className={labelClass}>Employee ID *</label>
                            <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Enter employee ID" className={inputClass} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="designation" className={labelClass}>Designation *</label>
                            <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} placeholder="Placement Officer, Coordinator, etc." className={inputClass} required />
                        </div>
                    </>
                );
            case 'ADMIN':
                return (
                    <>
                        <div className="mb-4">
                            <label htmlFor="employeeId" className={labelClass}>Employee ID *</label>
                            <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Enter employee ID" className={inputClass} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accessLevel" className={labelClass}>Access Level *</label>
                            <select id="accessLevel" name="accessLevel" value={formData.accessLevel} onChange={handleChange} className={inputClass} required>
                                <option value="">Select Access Level</option>
                                <option value="Full">Full Access</option>
                                <option value="Limited">Limited Access</option>
                                <option value="Read-Only">Read-Only</option>
                            </select>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h6 className="font-bold leading-tight uppercase text-xs text-slate-500 mb-2">User Information</h6>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-none">
                    <div className="mb-4">
                        <label className={labelClass}>Profile Photo</label>
                        <div
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${isDragging
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                                }`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            {photoPreview ? (
                                <div className="relative inline-block">
                                    <img
                                        src={photoPreview}
                                        alt="Profile preview"
                                        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                                    <div className="text-sm text-gray-500">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-blue-500 font-semibold hover:text-blue-600"
                                        >
                                            Upload a file
                                        </button>
                                        {' '}or drag and drop
                                    </div>
                                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoSelect(e.target.files[0])}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-none">
                    <div className="mb-4">
                        <label htmlFor="bio" className={labelClass}>Bio</label>
                        <input type="text" id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className={inputClass} />
                    </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-none">
                    <div className="mb-4">
                        <label htmlFor="status" className={labelClass}>Status</label>
                        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} placeholder="Status" className={inputClass} />
                    </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-none">
                    <div className="mb-4">
                        <label htmlFor="department" className={labelClass}>Department</label>
                        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder="Department" className={inputClass} />
                    </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-none">
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className={labelClass}>Phone Number</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
                    </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-none">
                    <div className="mb-4">
                        <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
                    </div>
                </div>
                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-none">
                    <div className="mb-4">
                        <label htmlFor="gender" className={labelClass}>Gender</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

            <h6 className="font-bold leading-tight uppercase text-xs text-slate-500 mb-2">Role Information</h6>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getRoleSpecificFields()}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-block px-6 py-3 font-bold text-center text-slate-700 align-middle transition-all bg-transparent border border-slate-700 rounded-lg cursor-pointer hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-block px-6 py-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-blue-500 to-violet-500 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
            </div>
        </form>
    );
};

ProfileForm.propTypes = {
    profileData: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default ProfileForm;
