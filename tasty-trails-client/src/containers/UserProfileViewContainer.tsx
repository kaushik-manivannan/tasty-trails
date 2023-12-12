import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserProfileViewComponent from '../components/UserProfileViewComponent.tsx';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/index.js'; // adjust the path as necessary

const UserProfileViewContainer: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const userId = useSelector((state: any) => state.auth.userId); // Adjust according to your state structure


    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await getUserById(userId);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

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
