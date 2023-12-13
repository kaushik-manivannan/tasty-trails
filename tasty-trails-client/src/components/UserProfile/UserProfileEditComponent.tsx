import React from 'react';
import styles from './UserProfileEditComponent.module.scss'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Props interface for UserProfileEditComponent
interface UserProfileEditProps {
    user: {
        emailId: string;
        fullName: string;
        userName: string;
        location: string;
    };
    imagePreviewUrl: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent) => void;
    onBack: () => void;
}

const UserProfileEditComponent: React.FC<UserProfileEditProps> = ({
    user,
    imagePreviewUrl,
    onInputChange,
    onImageChange,
    onSubmit,
    onBack,
}) => {
    // Using the translation hook from react-i18next
    const { t } = useTranslation();

    return (
        <div className={styles.userProfileEditContainer}>
            {/* User profile editing form */}
            <form onSubmit={onSubmit} className={styles.userProfileEdit}>
                {/* Back button */}
                <img src={`${process.env.PUBLIC_URL}/assets/back-arrow.svg`} onClick={onBack} className={styles.backButton}></img>
                
                {/* Image upload */}
                <div className={styles.inputContainer}>
                    <input
                        id="image"
                        type="file" 
                        onChange={onImageChange} 
                        accept=".jpg, .jpeg, .png, .gif"
                        className={styles.input}
                        style={{display: "none"}}
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('image')?.click()}
                        className={styles.fileUploadButton}
                    >
                        {imagePreviewUrl && (
                            <img src={imagePreviewUrl} alt="Profile Preview" className={styles.imagePreview} />
                        )}
                        {!imagePreviewUrl && <p>{t("Upload Image")}</p>}
                    </button>
                </div>
                
                {/* Email Input (Disabled) */}
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>{t('Email')}</label>
                    <input 
                        type="text" 
                        name="emailId" 
                        value={user.emailId} 
                        onChange={onInputChange} 
                        className={styles.input}
                        disabled
                    />
                </div>
                
                {/* Full Name Input */}
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>{t("Full Name")}</label>
                    <input 
                        type="text" 
                        name="fullName" 
                        value={user.fullName} 
                        onChange={onInputChange} 
                        className={styles.input}
                    />
                </div>
                
                {/* Username Input */}
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>{t('Username')}</label>
                    <input 
                        type="text" 
                        name="userName" 
                        value={user.userName} 
                        onChange={onInputChange} 
                        className={styles.input}
                    />
                </div>
                
                {/* Address Input */}
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>{t('Address')}</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={user.location} 
                        onChange={onInputChange} 
                        className={styles.input}
                    />
                </div>
                
                {/* Save Changes Button */}
                <button type="submit" className={styles.createButton}>{t("Save Changes")}</button>
            </form>
        </div>
    );
};

export default UserProfileEditComponent;