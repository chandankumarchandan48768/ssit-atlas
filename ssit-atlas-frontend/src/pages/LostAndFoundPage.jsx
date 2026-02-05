import { useState, useEffect } from 'react';
import api from '../api/axios';

const LostAndFoundPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({
        title: '',
        description: '',
        location: '',
        contactInfo: '',
        status: 'LOST'
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await api.get('/lost-found');
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
            fetchItems();
        } catch (error) {
            console.error("Error reporting item:", error);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading items...</div>;

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="px-4 mx-auto max-w-screen-xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Lost & Found</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        {showForm ? 'Close Form' : 'Report Item'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                                <input type="text" name="title" value={newItem.title} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input type="text" name="location" value={newItem.location} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input type="text" name="description" value={newItem.description} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Info</label>
                                <input type="text" name="contactInfo" value={newItem.contactInfo} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select name="status" value={newItem.status} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="LOST">Lost</option>
                                    <option value="FOUND">Found</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                )}

                {items.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No items found.</p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <div key={item.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${item.status === 'LOST' ? 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900' :
                                        item.status === 'FOUND' ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900'
                                        }`}>
                                        {item.status}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown Date'}
                                    </span>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.title}
                                </h2>
                                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                    {item.description}
                                </p>
                                <div className="space-y-2">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Location:</span> {item.location}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Contact:</span> {item.contactInfo}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LostAndFoundPage;
