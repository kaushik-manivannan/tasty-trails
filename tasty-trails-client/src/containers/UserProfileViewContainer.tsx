import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserProfileViewComponent from '../components/UserProfile/UserProfileViewComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/index.js'; // Adjust the path as necessary

/**
 * Fetches user data based on the authenticated user ID and renders the UserProfileViewComponent.
 */
const UserProfileViewContainer: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const userId = useSelector((state: any) => state.auth.userId);

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // Fetches user data based on the authenticated user ID.
    const fetchUserData = async () => {
        try {
            const response = await getUserById(userId);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    // Navigates to the user profile edit page
    const navigateToEdit = () => {
        navigate(`/edit-profile/${userId}`, { state: { user } });
    };

    if (!user) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <UserProfileViewComponent user={user} navigateToEdit={navigateToEdit} />
    );
};

export default UserProfileViewContainer;