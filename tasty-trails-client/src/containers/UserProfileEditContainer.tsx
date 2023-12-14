import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import UserProfileEditComponent from '../components/UserProfile/UserProfileEditComponent.tsx';
import { getUserById, updateUser } from '../api/index.js';
import { useNavigate} from 'react-router-dom';
import { sendAlert } from '../service/alert-service.ts';
 
const UserProfileEditContainer: React.FC = () => {
 
    const userId = useSelector((state: any) => state.auth.userId);
 
    const [user, setUser] = useState({
        emailId: '',
        fullName: '',
        userName: '',
        location: '',
    });
    const [image, setImage] = useState<string | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const navigate = useNavigate();
 
    const [fullNameError, setFullNameError] = useState<string>('');
    const [userNameError, setUserNameError] = useState<string>('');
   
    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);
 
    const fetchUserData = async () => {
        try {
            const response = await getUserById(userId);
            setUser(response.data);
            setImagePreviewUrl(response.data.image || '');
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };
 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
 
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
 
            convertFileToBase64(file, (base64Image: string) => {
                setImage(base64Image);
                setImagePreviewUrl(base64Image);
            });
        }
    };
 
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
     
        if(validateForm()) {
            const data = {
                "fullName":user.fullName,
                "userName":user.userName,
                "location":user.location,
                ...(image && { image: image })
            }
 
            try {
                await updateUser(userId,data);
                navigate('/profile');
                sendAlert("Profile Updated Successfully", "Success");
            } catch (error) {
                sendAlert('Error updating profile', 'Failure');
            }
        }
    };
 
    const validateForm = () => {
        let isValid = true;
   
        if (!user.fullName?.trim()) {
          setFullNameError('Full Name is required');
          isValid = false;
        } else {
          setFullNameError('');
        }
   
        if (!user.userName?.trim()) {
          setUserNameError('Username is required');
          isValid = false;
        } else {
          setUserNameError('');
        }
   
        return isValid;
      };
 
    const handleBack = () => {
        navigate('/profile');
    };
 
    function convertFileToBase64(file: File, callback: (result: string) => void) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            callback(reader.result as string);
        };
        reader.onerror = (error) => {
            console.error('Error converting file to base64:', error);
        };
    }
 
    return (
        <UserProfileEditComponent
            user={user}
            imagePreviewUrl={imagePreviewUrl}
            onInputChange={handleInputChange}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            fullNameError={fullNameError}
            userNameError={userNameError}
        />
    );
};
 
export default UserProfileEditContainer;