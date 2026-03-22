import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import CampusMapLibre from '../components/CampusMapLibre';

const EMPTY_FORM = {
    title: '',
    description: '',
    location: '',
    contactInfo: '',
    status: 'LOST',
    latitude: null,
    longitude: null,
    imageFile: null,
    imagePreview: null,
};

const LostAndFoundPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
    const [form, setForm] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [pickingLocation, setPickingLocation] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => { fetchItems(); }, [filterStatus]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const url = filterStatus === 'ALL' ? '/lost-found' : `/lost-found?status=${filterStatus}`;
            const res = await api.get(url);
            setItems(res.data || []);
        } catch (e) {
            console.error('Error fetching items:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setForm(prev => ({ ...prev, imageFile: file, imagePreview: preview }));
    };

    const handleMapPin = (pin) => {
        setForm(prev => ({ ...prev, latitude: pin.lat, longitude: pin.lng }));
        setPickingLocation(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', form.title);
            data.append('description', form.description);
            data.append('location', form.location);
            data.append('contactInfo', form.contactInfo);
            data.append('status', form.status);
            if (form.latitude)  data.append('latitude',  form.latitude);
            if (form.longitude) data.append('longitude', form.longitude);
            if (form.imageFile) data.append('image', form.imageFile);

            await api.post('/lost-found', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setForm(EMPTY_FORM);
            setShowForm(false);
            setPickingLocation(false);
            setSuccessMsg('Item reported successfully! 🎉');
            setTimeout(() => setSuccessMsg(''), 4000);
            fetchItems();
        } catch (e) {
            // Try plain JSON fallback if backend doesn't support multipart
            try {
                await api.post('/lost-found', {
                    title: form.title,
                    description: form.description,
                    location: form.location,
                    contactInfo: form.contactInfo,
                    status: form.status,
                    latitude: form.latitude,
                    longitude: form.longitude,
                });
                setForm(EMPTY_FORM);
                setShowForm(false);
                setSuccessMsg('Item reported successfully! 🎉');
                setTimeout(() => setSuccessMsg(''), 4000);
                fetchItems();
            } catch (e2) {
                console.error('Failed to submit:', e2);
                alert('Failed to report item. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const markAsFound = async (id) => {
        if (!window.confirm('Mark this item as FOUND?')) return;
        try {
            await api.put(`/lost-found/${id}/status?status=FOUND`);
            fetchItems();
        } catch (e) { alert('Failed to update status.'); }
    };

    const allPins = items.filter(i => i.latitude && i.longitude);

    const STATS = {
        total: items.length,
        lost:  items.filter(i => i.status === 'LOST').length,
        found: items.filter(i => i.status === 'FOUND').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-10 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight">Lost &amp; Found</h1>
                            <p className="text-blue-200 mt-1 text-sm">Pin your lost item on the campus map so anyone who finds it can reach you</p>
                        </div>
                        <button
                            onClick={() => { setShowForm(!showForm); }}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
                        >
                            <span className="text-lg">{showForm ? '✕' : '＋'}</span>
                            {showForm ? 'Close' : 'Report Item'}
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {[
                            { label: 'Total Reports', value: STATS.total, color: 'bg-white/10' },
                            { label: 'Active Lost',   value: STATS.lost,  color: 'bg-red-500/30' },
                            { label: 'Items Found',   value: STATS.found, color: 'bg-green-500/30' },
                        ].map(s => (
                            <div key={s.label} className={`${s.color} backdrop-blur rounded-xl p-4 text-center`}>
                                <div className="text-3xl font-bold">{s.value}</div>
                                <div className="text-xs text-blue-200 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Success message */}
                {successMsg && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800 font-medium">
                        {successMsg}
                    </div>
                )}

                {/* Report form */}
                {showForm && (
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                            <h2 className="text-white font-bold text-lg">Report a Lost / Found Item</h2>
                            <p className="text-blue-100 text-sm">Fill in details and optionally pin the location on the map</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name *</label>
                                    <input
                                        type="text" name="title" value={form.title} onChange={handleInput}
                                        required placeholder="e.g. Blue Water Bottle"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status *</label>
                                    <select
                                        name="status" value={form.status} onChange={handleInput}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none"
                                    >
                                        <option value="LOST">🔴 Lost (I lost this item)</option>
                                        <option value="FOUND">🟢 Found (I found this item)</option>
                                    </select>
                                </div>

                                {/* Location text */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location (text) *</label>
                                    <input
                                        type="text" name="location" value={form.location} onChange={handleInput}
                                        required placeholder="e.g. Library, 2nd Floor"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                </div>

                                {/* Contact */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Info *</label>
                                    <input
                                        type="text" name="contactInfo" value={form.contactInfo} onChange={handleInput}
                                        required placeholder="Phone or Email"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none"
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                                    <textarea
                                        name="description" value={form.description} onChange={handleInput}
                                        required rows="3" placeholder="Describe the item in detail..."
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none resize-none"
                                    />
                                </div>

                                {/* Image upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo (optional)</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors flex items-center gap-3"
                                    >
                                        {form.imagePreview ? (
                                            <img src={form.imagePreview} alt="preview" className="w-16 h-16 object-cover rounded-lg" />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl">📷</div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {form.imagePreview ? 'Change photo' : 'Upload photo'}
                                            </p>
                                            <p className="text-xs text-gray-400">JPG, PNG up to 5MB</p>
                                        </div>
                                    </div>
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </div>

                                {/* Map pin */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pin on Map (optional)</label>
                                    <button
                                        type="button"
                                        onClick={() => setPickingLocation(!pickingLocation)}
                                        className={`w-full border-2 border-dashed rounded-xl p-4 text-sm font-medium transition-colors
                                            ${pickingLocation
                                                ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                                                : form.latitude
                                                    ? 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700'
                                                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 text-gray-600 dark:text-gray-400'}`}
                                    >
                                        {pickingLocation ? '⬆ Click on the map below...' :
                                         form.latitude ? `✅ Pinned: ${form.latitude.toFixed(5)}, ${form.longitude.toFixed(5)}` :
                                         '📍 Click to pin location on map'}
                                    </button>
                                </div>
                            </div>

                            {/* Mini map for pinning */}
                            {pickingLocation && (
                                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700" style={{ height: 300 }}>
                                    <CampusMapLibre
                                        mode="lostfound"
                                        lostFoundPins={[]}
                                        onMapClick={handleMapPin}
                                    />
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button" onClick={() => { setShowForm(false); setPickingLocation(false); setForm(EMPTY_FORM); }}
                                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                                >Cancel</button>
                                <button
                                    type="submit" disabled={submitting}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                                >
                                    {submitting ? '⏳ Submitting...' : 'Submit Report'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Filters + view toggle */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
                    {/* Status filter */}
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                        {['ALL', 'LOST', 'FOUND'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-5 py-2 text-sm font-medium transition-colors
                                    ${filterStatus === s
                                        ? s === 'LOST' ? 'bg-red-600 text-white'
                                          : s === 'FOUND' ? 'bg-green-600 text-white'
                                          : 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'}`}
                            >
                                {s === 'LOST' ? '🔴 Lost' : s === 'FOUND' ? '🟢 Found' : '🔵 All'}
                            </button>
                        ))}
                    </div>

                    {/* View toggle */}
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50'}`}
                        >
                            ⊟ List
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50'}`}
                        >
                            🗺 Map View
                        </button>
                    </div>
                </div>

                {/* Map view */}
                {viewMode === 'map' && (
                    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg mb-6" style={{ height: 480 }}>
                        <CampusMapLibre
                            lostFoundPins={allPins}
                            mode="lostfound-view"
                        />
                    </div>
                )}

                {/* Grid view */}
                {viewMode === 'grid' && (
                    <>
                        {loading ? (
                            <div className="flex justify-center py-16">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <div className="text-5xl mb-4">🔍</div>
                                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No {filterStatus !== 'ALL' ? filterStatus.toLowerCase() : ''} items found</p>
                                <p className="text-sm text-gray-400 mt-2">Be the first to report one!</p>
                            </div>
                        ) : (
                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {items.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                                        {/* Item image */}
                                        {item.imageUrl && (
                                            <div className="h-44 overflow-hidden">
                                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                            </div>
                                        )}

                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider
                                                    ${item.status === 'LOST'
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                                                    {item.status === 'LOST' ? '🔴 Lost' : '🟢 Found'}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Just now'}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{item.description}</p>

                                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-1.5">
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
                                                    <span>📍</span>
                                                    <span className="truncate">{item.location}</span>
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
                                                    <span>📞</span>
                                                    <span className="truncate">{item.contactInfo}</span>
                                                </div>
                                                {item.latitude && item.longitude && (
                                                    <div className="flex items-center text-xs text-blue-500 gap-2">
                                                        <span>🗺</span>
                                                        <span>Location pinned on map</span>
                                                    </div>
                                                )}
                                            </div>

                                            {item.status === 'LOST' && (
                                                <button
                                                    onClick={() => markAsFound(item.id)}
                                                    className="mt-4 w-full text-sm font-semibold py-2 rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                                                >
                                                    ✓ Mark as Found
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LostAndFoundPage;
