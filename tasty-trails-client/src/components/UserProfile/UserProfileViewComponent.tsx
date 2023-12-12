import React from 'react';
import styles from './UserProfileViewComponent.module.scss'

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
        <div className={styles.userProfileContainer}>
            <div className={styles.userProfile}>
            <h1 className={styles.heading}>Your Profile</h1>
                {user.image && <img src={user.image} alt="Profile" className={styles.profilePic}/>}
                <p className={styles.userInfo}><strong>Full Name:</strong> {user.fullName}</p>
                <p className={styles.userInfo}><strong>Email:</strong> {user.emailId}</p>
                <p className={styles.userInfo}><strong>Username:</strong> {user.userName}</p>
                <p className={styles.userInfo}><strong>Address:</strong> {user.location}</p>
                <button onClick={navigateToEdit} className={styles.editButton}>Edit Profile</button>
            </div>
        </div>
    );
};

export default UserProfileViewComponent;
