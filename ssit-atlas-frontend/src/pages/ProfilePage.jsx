import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { getProfile, updateProfile, uploadProfilePhoto, deleteProfilePhoto } from '../api/profileApi';
import ProfileForm from '../components/ProfileForm';
import { User, Edit, Camera, Trash2, CheckCircle2 } from 'lucide-react';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const data = await getProfile();
            setProfile(data);
        } catch (err) {
            setError('Failed to load profile');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveProfile = async (formData, photoFile) => {
        try {
            setIsLoading(true);
            setError('');
            setSuccess('');

            if (photoFile) {
                try {
                    await uploadProfilePhoto(photoFile);
                } catch (photoErr) {
                    console.error('Photo upload failed:', photoErr);
                    setError('Photo upload failed: ' + (photoErr.response?.data?.error || photoErr.message));
                    setIsLoading(false);
                    return;
                }
            }

            const updated = await updateProfile(formData);
            setProfile(updated);
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Profile update error:', err);
            
            let errorMessage = 'Failed to update profile';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePhoto = async () => {
        if (!window.confirm('Are you sure you want to delete your profile photo?')) {
            return;
        }

        try {
            setIsLoading(true);
            await deleteProfilePhoto();
            await fetchProfile();
            setSuccess('Profile photo deleted');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete photo');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !profile) {
        return (
            <DashboardLayout pageName="Profile">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout pageName="Profile">
            <div className="relative w-full mx-auto mt-60">
                <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 overflow-hidden break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border -mt-64 relative z-20">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-auto max-w-full px-3">
                            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-19 w-19 rounded-xl">
                                {profile?.profilePhotoUrl ? (
                                    <img
                                        src={`http://localhost:8080${profile.profilePhotoUrl}`}
                                        alt={profile.name}
                                        className="w-full shadow-2xl rounded-xl"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-xl bg-slate-300 flex items-center justify-center shadow-2xl">
                                        <User className="w-8 h-8 text-slate-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-none w-auto max-w-full px-3 my-auto">
                            <div className="h-full">
                                <h5 className="mb-1 dark:text-white">{profile?.name}</h5>
                                <p className="mb-0 font-semibold leading-normal text-sm dark:text-white dark:opacity-60">{profile?.role?.replace(/_/g, ' ')}</p>
                            </div>
                        </div>
                        <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                            <div className="relative right-0">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="inline-block px-6 py-3 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-blue-500 to-violet-500 hover:shadow-xs hover:-translate-y-px active:opacity-85 text-xs float-right"
                                >
                                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full p-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    {/* Success/Error Messages */}
                    {(success || error) && (
                        <div className="w-full px-3 mb-6">
                            <div className={`relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border p-4 ${success ? 'border-l-4 border-emerald-500' : 'border-l-4 border-red-500'}`}>
                                <div className="flex items-center">
                                    {success && <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />}
                                    <span className={success ? 'text-emerald-500' : 'text-red-500'}>{success || error}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isEditing ? (
                        <>
                            <div className="w-full max-w-full px-3 lg:w-2/3 lg:flex-none">
                                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                                    <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-black/20">
                                        <h6 className="dark:text-white">Profile Information</h6>
                                    </div>
                                    <div className="flex-auto p-6">
                                        <p className="leading-normal text-sm dark:text-white dark:opacity-80">
                                            {profile?.bio || 'No bio added yet.'}
                                        </p>
                                        <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
                                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                                                <strong className="text-slate-700 dark:text-white">Full Name:</strong> &nbsp; {profile?.name}
                                            </li>
                                            <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                                <strong className="text-slate-700 dark:text-white">Email:</strong> &nbsp; {profile?.email}
                                            </li>
                                            {profile?.department && (
                                                <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                                    <strong className="text-slate-700 dark:text-white">Department:</strong> &nbsp; {profile?.department}
                                                </li>
                                            )}
                                            <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                                <strong className="text-slate-700 dark:text-white">Location:</strong> &nbsp; {profile?.officeLocation || 'N/A'}
                                            </li>
                                            {profile?.phoneNumber && (
                                                <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                                    <strong className="text-slate-700 dark:text-white">Mobile:</strong> &nbsp; {profile?.phoneNumber}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-full px-3 mt-6 lg:mt-0 lg:w-1/3 lg:flex-none">
                                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                                    <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-black/20">
                                        <h6 className="mb-0 dark:text-white">Role Details: {profile?.role?.replace(/_/g, ' ')}</h6>
                                    </div>
                                    <div className="flex-auto p-6">
                                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                            {Object.entries(profile || {}).map(([key, value]) => {
                                                if (['id', 'name', 'email', 'bio', 'profilePhotoUrl', 'role', 'status', 'password', 'createdAt', 'updatedAt', 'isComplete'].includes(key)) return null;
                                                if (!value) return null;
                                                return (
                                                    <li key={key} className="relative block px-0 py-2 bg-white border-0 border-b-0 text-inherit">
                                                        <div className="flex items-center">
                                                            <div className="flex flex-col">
                                                                <h6 className="mb-1 text-sm leading-normal text-slate-700 dark:text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h6>
                                                                <span className="text-xs leading-tight dark:text-white/80">{value.toString()}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full max-w-full px-3">
                            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                                <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-black/20">
                                    <h6 className="mb-0 dark:text-white">Edit Profile</h6>
                                </div>
                                <div className="flex-auto p-6">
                                    <ProfileForm
                                        profileData={profile}
                                        onSave={handleSaveProfile}
                                        onCancel={() => setIsEditing(false)}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;
