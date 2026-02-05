import { useState } from 'react';
import api from '../../api/axios';

const AddPlacementRecord = ({ onClose, onRecordAdded }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        studentUsn: '',
        department: 'CSE',
        companyName: '',
        jobRole: '',
        packageAmount: '',
        packageType: 'CTC',
        placementDate: new Date().toISOString().split('T')[0],
        location: '',
        academicYear: '2024-25'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Ensure packageAmount is a number
            const payload = {
                ...formData,
                packageAmount: parseFloat(formData.packageAmount),
                placementDate: new Date(formData.placementDate).toISOString()
            };

            await api.post('/placements', payload);
            if (onRecordAdded) onRecordAdded();
            if (onClose) onClose();
            alert('Placement record added successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to add placement record.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add Placement Record</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student Name</label>
                        <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">USN</label>
                        <input type="text" name="studentUsn" required value={formData.studentUsn} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                        <select name="department" value={formData.department} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white">
                            <option value="CSE">CSE</option>
                            <option value="ISE">ISE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Academic Year</label>
                        <input type="text" name="academicYear" required value={formData.academicYear} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                        <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Role</label>
                        <input type="text" name="jobRole" required value={formData.jobRole} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Package (LPA)</label>
                        <input type="number" step="0.1" name="packageAmount" required value={formData.packageAmount} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Package Type</label>
                        <select name="packageType" value={formData.packageType} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-50 border dark:bg-gray-700 dark:text-white">
                            <option value="CTC">CTC</option>
                            <option value="IN_HAND">In Hand</option>
                            <option value="STIPEND">Stipend</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    {onClose && (
                        <button type="button" onClick={onClose}
                            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                            Cancel
                        </button>
                    )}
                    <button type="submit" disabled={loading}
                        className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                        {loading ? 'Adding...' : 'Add Record'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPlacementRecord;
