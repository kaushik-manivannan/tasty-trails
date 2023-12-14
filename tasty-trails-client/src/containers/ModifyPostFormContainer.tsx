// ModifyPostContainer.tsx
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import ModifyPostForm from "../components/ModifyPostForm/ModifyPostForm";
import { PostFormData, ModifyPostContainerProps } from "../interfaces/post-interfaces";
import { useSelector } from 'react-redux';
import { getuserCommunities } from "../api/index.js";
import { updatePost } from "../api/index.js";
import { sendAlert } from "../service/alert-service.ts";

/**
 * ModifyPostContainer is responsible for managing the state and logic
 * related to modifying a post. It interacts with the API to perform post updates.
 */
const ModifyPostContainer: React.FC<ModifyPostContainerProps> = ({ setIsOnEdit, post,setPost }) => {
  // Form state and validation using react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<PostFormData>({
    mode: 'onChange',
  });

  // Local state to manage communities and image preview
  const [communities, setCommunities] = useState([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // User ID from Redux store
  const userId = useSelector((state: any) => state.auth.userId);

  // Function to fetch all communities of the user
  const fetchUserCommunities = async () => {
    try {
      const response = await getuserCommunities(userId);

      if (response.status !== 200) {
        throw new Error("Error occurred while fetching communities of a specific user");
      }

      // Set communities and update form values
      setCommunities(response.data);
      updateFormValues();
    } catch (error) {
      throw new Error("Error occurred while fetching communities of a specific user");
    }
  }

  // Function to update form values after fetching communities
  const updateFormValues = () => {
    setValue('description', post.description);
    setValue('location', post.location);
    setImagePreview(post.image);
    setValue('community', post.communityId);

    if (post.image) {
      // Added dummy value for image path since we are setting the image preview
      setValue('image', "/DummyPath/image.jpg");
    }
  }

  useEffect(() => {
    // Fetch user communities and update form values on component mount
    fetchUserCommunities();
  }, []);

  // Function to call when the form is submitted
  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const payload = {
      userId: userId,
      description: data.description,
      location: data.location,
      image: imagePreview,
      availabilityStatus: "true",
      latitude: data.latitude,
      longitude: data.longitude,
      communityId: data.community
    };

    // Send the request to the API to update the post
    try {
      const response = await updatePost(post._id, payload);
      if (response.status !== 200) {
        throw new Error('Failed to update post');
      }
      sendAlert('Post updated successfully', 'Success');
      setIsOnEdit(false); // Exit edit mode
      setPost(response.data);
    } catch (error) {
      console.error('Failed to update post');
    }
  };

  // Function to handle image preview, get the file and read it into base64
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ModifyPostForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      imagePreview={imagePreview}
      onImageChange={handleImageChange}
      setValue={setValue}
      communities={communities}
    />
  );
};

export default ModifyPostContainer;