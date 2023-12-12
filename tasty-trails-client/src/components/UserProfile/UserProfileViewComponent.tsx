import React from 'react';

interface UserProfileViewComponentProps {
    user: {
        emailId: string;
        fullName: string;
        userName: string;
        image: string;
        location: string;
    };
    navigateToEdit: () => void;
}

const UserProfileViewComponent: React.FC<UserProfileViewComponentProps> = ({ user, navigateToEdit }) => {
    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Email:</strong> {user.emailId}</p>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Username:</strong> {user.userName}</p>
            {user.image && <img src={user.image} alt="Profile" />}
            <p><strong>Location:</strong> {user.location}</p>
            <button onClick={navigateToEdit}>Edit Profile</button>
        </div>
    );
};

export default UserProfileViewComponent;
