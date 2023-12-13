import React from 'react';
import styles from './UserProfileViewComponent.module.scss';
import { useTranslation } from 'react-i18next';

// Props interface for UserProfileViewComponent
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
  // Using the translation hook from react-i18next
  const { t } = useTranslation();

  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userProfile}>
        {/* Heading */}
        <h1 className={styles.heading}>{t('Your Profile')}</h1>
        
        {/* User Profile Picture */}
        {user.image && <img src={user.image} alt="Profile" className={styles.profilePic}/>}
        
        {/* User Information */}
        <p className={styles.userInfo}><strong>{t('Full Name')}:</strong> {user.fullName}</p>
        <p className={`${styles.userInfo} ${styles.email}`}><strong>{t('Email')}:</strong> {user.emailId}</p>
        <p className={styles.userInfo}><strong>{t('Username')}:</strong> {user.userName}</p>
        <p className={styles.userInfo}><strong>{t('Address')}:</strong> {user.location}</p>
        
        {/* Edit Profile Button */}
        <button onClick={navigateToEdit} className={styles.editButton}>{t('Edit Profile')}</button>
      </div>
    </div>
  );
};

export default UserProfileViewComponent;