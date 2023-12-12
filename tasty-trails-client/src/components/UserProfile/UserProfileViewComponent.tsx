import React from 'react';
import styles from './UserProfileViewComponent.module.scss';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.userProfile}>
            <h1 className={styles.heading}>{t('Your Profile')}</h1>
                {user.image && <img src={user.image} alt="Profile" className={styles.profilePic}/>}
                <p className={styles.userInfo}><strong>Full Name:</strong> {user.fullName}</p>
                <p className={styles.userInfo}><strong>Email:</strong> {user.emailId}</p>
                <p className={styles.userInfo}><strong>Username:</strong> {user.userName}</p>
                <p className={styles.userInfo}><strong>Address:</strong> {user.location}</p>
                <button onClick={navigateToEdit} className={styles.editButton}>{t('Edit Profile')}</button>
            </div>
        </div>
    );
};

export default UserProfileViewComponent;
