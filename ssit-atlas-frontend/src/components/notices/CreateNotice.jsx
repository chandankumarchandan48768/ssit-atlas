import { useState } from 'react';
import api from '../../api/axios';

const CreateNotice = ({ user, onClose, onNoticeCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [noticeType, setNoticeType] = useState('NOTICE');
    const [priority, setPriority] = useState('NORMAL');
    const [targetAudience, setTargetAudience] = useState('ALL');
    const [department, setDepartment] = useState(user.role === 'HOD' ? user.department : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                title,
                content,
                noticeType,
                priority,
                targetAudience,
                department, // HOD's department or selected by Admin
            };

            await api.post('/notices', payload);
            if (onNoticeCreated) onNoticeCreated();
            if (onClose) onClose();
            alert('Notice created successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to create notice. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New {noticeType}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 bg-gray-50 border"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                    <textarea
                        required
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 bg-gray-50 border"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 bg-gray-50 border"
                            value={noticeType}
                            onChange={(e) => setNoticeType(e.target.value)}
                        >
                            <option value="NOTICE">Notice</option>
                            <option value="MEMO">Memo</option>
                            <option value="CIRCULAR">Circular</option>
                            <option value="ANNOUNCEMENT">Announcement</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 bg-gray-50 border"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="NORMAL">Normal</option>
                            <option value="IMPORTANT">Important</option>
                            <option value="EMERGENCY">Emergency</option>
                            <option value="FYI">FYI</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Audience</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 bg-gray-50 border"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                        >
                            <option value="ALL">Everyone</option>
                            <option value="STUDENTS">Students Only</option>
                            <option value="FACULTY">Faculty Only</option>
                        </select>
                    </div>

                    {/* Admin can select department, HOD is fixed */}
                    {user.role === 'ADMIN' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 bg-gray-50 border"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">Select Dept</option>
                                <option value="CSE">CSE</option>
                                <option value="ISE">ISE</option>
                                <option value="ECE">ECE</option>
                                {/* Add other depts */}
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Post Notice'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNotice;
