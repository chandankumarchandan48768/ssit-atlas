import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Plus, Edit2, Trash2, X, MapPin, Layers } from 'lucide-react';
import api from '../api/axios';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const BuildingManagementPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [buildings, setBuildings] = useState([]);
    const [filteredBuildings, setFilteredBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [view, setView] = useState('grid'); // 'grid' or 'list'

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        center: { lat: '', lng: '' },
        polygon: '',
        floors: '',
        metadata: ''
    });

    useEffect(() => {
        // Check if current user is ADMIN
        const checkAdminAccess = async () => {
            try {
                const response = await api.get('/auth/me');
                setCurrentUser(response.data);
                
                if (response.data.role !== 'ADMIN') {
                    setUnauthorized(true);
                    setTimeout(() => navigate('/dashboard'), 2000);
                    return;
                }
                
                fetchBuildings();
            } catch (error) {
                console.error('Error checking admin access:', error);
                setUnauthorized(true);
                setTimeout(() => navigate('/login'), 2000);
            }
        };

        checkAdminAccess();
    }, [navigate]);

    useEffect(() => {
        filterBuildings();
    }, [buildings, searchTerm]);

    const fetchBuildings = async () => {
        try {
            const response = await api.get('/buildings');
            setBuildings(response.data);
        } catch (error) {
            console.error('Error fetching buildings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (unauthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Only administrators can access this page.</p>
                    <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return <SkeletonLoader />;
    }

    const filterBuildings = () => {
        if (searchTerm) {
            const filtered = buildings.filter(building =>
                building.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                building.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                building.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBuildings(filtered);
        } else {
            setFilteredBuildings(buildings);
        }
    };

    const parseFormDataToBuilding = () => {
        const buildingData = {
            name: formData.name,
            code: formData.code,
            description: formData.description,
            center: [parseFloat(formData.center.lat), parseFloat(formData.center.lng)],
            polygon: formData.polygon ? JSON.parse(formData.polygon) : [],
            floors: formData.floors ? formData.floors.split(',').map(f => parseInt(f.trim())) : [],
            metadata: formData.metadata ? JSON.parse(formData.metadata) : {}
        };
        return buildingData;
    };

    const handleCreateBuilding = async (e) => {
        e.preventDefault();
        try {
            const buildingData = parseFormDataToBuilding();
            const response = await api.post('/buildings', buildingData);
            setBuildings([...buildings, response.data]);
            setShowCreateModal(false);
            resetForm();
        } catch (error) {
            console.error('Error creating building:', error);
            alert('Failed to create building. Check your input format.');
        }
    };

    const handleUpdateBuilding = async (e) => {
        e.preventDefault();
        try {
            const buildingData = parseFormDataToBuilding();
            const response = await api.put(`/buildings/${selectedBuilding.id}`, buildingData);
            setBuildings(buildings.map(b => b.id === selectedBuilding.id ? response.data : b));
            setShowEditModal(false);
            resetForm();
        } catch (error) {
            console.error('Error updating building:', error);
            alert('Failed to update building. Check your input format.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this building?')) return;
        try {
            await api.delete(`/buildings/${id}`);
            setBuildings(buildings.filter(building => building.id !== id));
        } catch (error) {
            console.error('Error deleting building:', error);
        }
    };

    const openEditModal = (building) => {
        setSelectedBuilding(building);
        setFormData({
            name: building.name,
            code: building.code,
            description: building.description || '',
            center: {
                lat: building.center?.[0] || '',
                lng: building.center?.[1] || ''
            },
            polygon: building.polygon ? JSON.stringify(building.polygon) : '',
            floors: building.floors ? building.floors.join(', ') : '',
            metadata: building.metadata ? JSON.stringify(building.metadata, null, 2) : ''
        });
        setShowEditModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            code: '',
            description: '',
            center: { lat: '', lng: '' },
            polygon: '',
            floors: '',
            metadata: ''
        });
        setSelectedBuilding(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SkeletonLoader variant="card" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        Building Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage campus buildings and their details</p>
                </div>

                {/* Controls */}
                <div className="glass-premium p-6 rounded-2xl mb-6 animate-slide-down">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        {/* Search */}
                        <div className="flex-1 relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, code, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                            <button
                                onClick={() => setView('grid')}
                                className={`px-4 py-2 rounded-md transition-colors ${view === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`px-4 py-2 rounded-md transition-colors ${view === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                            >
                                List
                            </button>
                        </div>

                        {/* Create Button */}
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            <Plus size={20} />
                            Add Building
                        </button>
                    </div>
                </div>

                {/* Buildings Grid/List */}
                {view === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBuildings.map((building, index) => (
                            <div
                                key={building.id}
                                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                            <Building2 size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{building.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Code: {building.code}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {building.description || 'No description'}
                                </p>

                                <div className="space-y-2 mb-4">
                                    {building.center && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <MapPin size={16} />
                                            <span>{building.center[0]?.toFixed(6)}, {building.center[1]?.toFixed(6)}</span>
                                        </div>
                                    )}
                                    {building.floors && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Layers size={16} />
                                            <span>{building.floors.length} floors</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(building)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(building.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Description</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Floors</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredBuildings.map((building) => (
                                    <tr key={building.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{building.name}</td>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{building.code}</td>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 max-w-xs truncate">{building.description || '-'}</td>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{building.floors?.length || 0}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(building)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(building.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredBuildings.length === 0 && (
                    <div className="glass-card rounded-2xl p-12 text-center">
                        <Building2 size={64} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">No buildings found</p>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
                    <div className="glass-premium rounded-2xl p-8 max-w-2xl w-full my-8 animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {showCreateModal ? 'Create New Building' : 'Edit Building'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setShowEditModal(false);
                                    resetForm();
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={showCreateModal ? handleCreateBuilding : handleUpdateBuilding} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Building Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Building Code"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Center Latitude"
                                    value={formData.center.lat}
                                    onChange={(e) => setFormData({ ...formData, center: { ...formData.center, lat: e.target.value } })}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Center Longitude"
                                    value={formData.center.lng}
                                    onChange={(e) => setFormData({ ...formData, center: { ...formData.center, lng: e.target.value } })}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Floors (comma separated, e.g., 1, 2, 3)"
                                value={formData.floors}
                                onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />

                            <textarea
                                placeholder="Polygon (JSON array of [lat, lng] pairs)"
                                value={formData.polygon}
                                onChange={(e) => setFormData({ ...formData, polygon: e.target.value })}
                                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                                rows="3"
                            />

                            <textarea
                                placeholder="Metadata (JSON object)"
                                value={formData.metadata}
                                onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                                rows="4"
                            />

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setShowEditModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg"
                                >
                                    {showCreateModal ? 'Create Building' : 'Update Building'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuildingManagementPage;
