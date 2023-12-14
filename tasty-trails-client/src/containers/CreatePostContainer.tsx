import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import { PostFormData } from "../interfaces/post-interfaces";
import { useSelector } from 'react-redux';
import { getuserCommunities } from "../api/index.js";
import { createPost } from "../api/index.js";
import { useNavigate } from 'react-router-dom';
import { sendAlert } from "../service/alert-service.ts";

/**
 * CreatePostContainer component is responsible for the creation of a new post.
 * It contains a form to create a new post.
 */
const CreatePostContainer: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<PostFormData>({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const userId = useSelector((state: any) => state.auth.userId);

  // Function to fetch all communities of the user
  const fetchUserCommunities = async () => {
    try {
      const response = await getuserCommunities(userId);
      
      // Check if the response status is not 200 (OK)
      if (response.status !== 200) {
        throw new Error("Error occurred while fetching communities of a specific user");
      }
      
      // Set the retrieved communities in the state
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching communities of a specific user:", error);
    }
  }

  useEffect(() => {
    fetchUserCommunities();
  }, []);

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const payload = {
      userId: userId,
      description: data.description,
      location: data.location,
      image: imagePreview,
      availabilityStatus: "true",
      latitude: getValues("latitude"),
      longitude: getValues("longitude"),
      communityId: data.community
    };

    // API call to create a post
    try {
      const response = await createPost(payload);
      
      // Check if the response status is not 201 (Created)
      if (response.status !== 201) {
        throw new Error('Failed to create post');
      }
      
      // Display success message and navigate back to the home page
      sendAlert("Post Created Successfully", "Success");
      navigate(-1);
    } catch (error) {
      console.error('Failed to create post');
    }
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to store the image preview

  // Function to handle the image preview, get the file and read it into base 64
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
    <CreatePostForm
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

export default CreatePostContainer;