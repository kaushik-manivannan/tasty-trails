import React from 'react';

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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="text" 
                        name="emailId" 
                        value={user.emailId} 
                        onChange={onInputChange} 
                    />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input 
                        type="text" 
                        name="fullName" 
                        value={user.fullName} 
                        onChange={onInputChange} 
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="userName" 
                        value={user.userName} 
                        onChange={onInputChange} 
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={user.location} 
                        onChange={onInputChange} 
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input 
                        type="file" 
                        onChange={onImageChange} 
                    />
                    {imagePreviewUrl && (
                        <img src={imagePreviewUrl} alt="Profile Preview" style={{ width: '100px', height: '100px' }} />
                    )}
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onBack}>Back</button>
            </form>
        </div>
    );
};

export default UserProfileEditComponent;
