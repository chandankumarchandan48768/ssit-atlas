import { useState, useEffect } from 'react';
import api from '../api/axios';

const LostAndFoundPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [filterStatus, setFilterStatus] = useState('LOST');
    const [newItem, setNewItem] = useState({
        title: '',
        description: '',
        location: '',
        contactInfo: '',
        status: 'LOST'
    });

    useEffect(() => {
        fetchItems();
    }, [filterStatus]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/lost-found?status=${filterStatus}`);
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/lost-found', newItem);
            setShowForm(false);
            setNewItem({
                title: '',
                description: '',
                location: '',
                contactInfo: '',
                status: 'LOST'
            });
            // If we added a item that matches current filter, refresh. 
            // If filter is different (e.g. added LOST while viewing FOUND), we might want to switch or just notify.
            // For simplicity, just refresh.
            fetchItems();
            alert('Item reported successfully!');
        } catch (error) {
            console.error("Error reporting item:", error);
            alert('Failed to report item.');
        }
    };

    const markAsFound = async (id) => {
        if (!confirm('Are you sure you want to mark this item as FOUND?')) return;
        try {
            await api.put(`/lost-found/${id}/status?status=FOUND`);
            fetchItems(); // Refresh list, item should disappear from LOST list
            alert('Item marked as found!');
        } catch (error) {
            console.error("Error updating status:", error);
            alert('Failed to update status.');
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="px-4 mx-auto max-w-screen-xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Lost & Found</h2>

                    <div className="flex gap-4">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                type="button"
                                onClick={() => setFilterStatus('LOST')}
                                className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ${filterStatus === 'LOST' ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : 'bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600'}`}
                            >
                                Lost Items
                            </button>
                            <button
                                type="button"
                                onClick={() => setFilterStatus('FOUND')}
                                className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ${filterStatus === 'FOUND' ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : 'bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600'}`}
                            >
                                Found Items
                            </button>
                        </div>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            {showForm ? 'Close Form' : 'Report Item'}
                        </button>
                    </div>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-fade-in-down">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Report an Item</h3>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                                <input type="text" name="title" value={newItem.title} onChange={handleInputChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required placeholder="e.g. Blue Umbrella" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input type="text" name="location" value={newItem.location} onChange={handleInputChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required placeholder="e.g. Library, 2nd Floor" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name="description" rows="3" value={newItem.description} onChange={handleInputChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required placeholder="Describe the item..."></textarea>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Info</label>
                                <input type="text" name="contactInfo" value={newItem.contactInfo} onChange={handleInputChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required placeholder="Phone or Email" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select name="status" value={newItem.status} onChange={handleInputChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option value="LOST">Lost</option>
                                    <option value="FOUND">Found</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setShowForm(false)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Report</button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <div className="text-center py-10">
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No {filterStatus.toLowerCase()} items found.</p>
                        <p className="text-sm text-gray-400 mt-2">Check back later or report a new item.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <div key={item.id} className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${item.status === 'LOST'
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                        }`}>
                                        {item.status}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mb-4 font-light text-gray-500 dark:text-gray-400 flex-grow">
                                    {item.description}
                                </p>

                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {item.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        {item.contactInfo}
                                    </div>
                                </div>

                                {item.status === 'LOST' && (
                                    <button
                                        onClick={() => markAsFound(item.id)}
                                        className="w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 transition-colors"
                                    >
                                        Mark as Found
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LostAndFoundPage;
