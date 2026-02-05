import { useState, useEffect } from 'react';
import api from '../../api/axios';

const NoticeList = ({ department, showPinnedOnly = false }) => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotices = async () => {
        try {
            setLoading(true);
            let url = '/notices/pinned';

            if (!showPinnedOnly && department) {
                // If department is provided, fetch department notices
                // Note: You might need to adjust backend to allow fetching ALL notices if no dept is specified
                // For now, let's assume we use department-specific endpoint
                url = `/notices/department/${department}`;
            }

            const response = await api.get(url);
            setNotices(response.data);
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, [department, showPinnedOnly]);

    if (loading) return <div className="text-center py-4">Loading notices...</div>;

    if (notices.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <p>No notices found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {notices.map((notice) => (
                <div key={notice.id} className={`p-4 rounded-lg border shadow-sm ${notice.priority === 'EMERGENCY' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                        notice.priority === 'IMPORTANT' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                            'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mr-2 ${notice.noticeType === 'MEMO' ? 'bg-gray-200 text-gray-800' :
                                    notice.noticeType === 'CIRCULAR' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                }`}>
                                {notice.noticeType}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(notice.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        {notice.priority !== 'NORMAL' && (
                            <span className={`text-xs font-bold uppercase ${notice.priority === 'EMERGENCY' ? 'text-red-600' : 'text-yellow-600'
                                }`}>
                                {notice.priority}
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{notice.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{notice.content}</p>

                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500">
                        <span>Audience: {notice.targetAudience}</span>
                        <span>Dept: {notice.department}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoticeList;
