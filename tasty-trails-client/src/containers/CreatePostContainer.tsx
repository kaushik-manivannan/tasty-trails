import React, { useState,useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import { PostFormData } from "../interfaces/post-interfaces";
import {useSelector} from'react-redux';
import {getuserCommunities} from "../api/index.js";
import {createPost} from "../api/index.js"

const CreatePostContainer: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    mode: 'onChange',
  });
  const [communites, setCommunities] = useState([]);
  const userId = useSelector((state:any) => state.auth.userId);
  const fetchUserCommunities = async () => {
    const resposne = await getuserCommunities(userId);
    try{
      if(resposne.status !== 200) {
        throw new Error("error occured while fetching communities of specific user");
      }
      setCommunities(resposne.data);
      console.log(resposne.data);
    }catch(error){
      throw new Error("error occured while fetching communities of specific user");
    }
  }
  useEffect(() => {
    fetchUserCommunities();
  },[]);
  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const payload = {postDetails:{
      userId: userId,
      description: data.description,
      location: data.location,
      image: imagePreview,
      availabilityStatus:"true",
      },
      communityId: data.community
    };

    try {
      const response = await createPost(payload);
      if (response.status!== 200) {
        throw new Error('Failed to create post');
      }
      console.log(response.data);
    } catch (error) {
      console.error('Failed to create post');
    }
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      communities={communites}
    />
  );
};

export default CreatePostContainer;