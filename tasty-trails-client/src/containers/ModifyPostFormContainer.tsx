import React, { useState,useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import ModifyPostForm from "../components/ModifyPostForm/ModifyPostForm";
import { PostFormData,ModifyPostContainerProps } from "../interfaces/post-interfaces";
import {useSelector} from'react-redux';
import {getuserCommunities} from "../api/index.js";
import {updatePost} from "../api/index.js";

const ModifyPostContainer: React.FC<ModifyPostContainerProps> = ({setIsEditable, post}) => {
  const { register, handleSubmit, formState: { errors },setValue } = useForm<PostFormData>({
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
      updateFormValues();
      console.log(resposne.data);
    }catch(error){
      throw new Error("error occured while fetching communities of specific user");
    }
  }
  const updateFormValues = () => {
    setValue('description', post.description);
    setValue('location', post.location);
    setImagePreview(post.image);
    setValue('community', post.communityId);
  }
  useEffect(() => {
    fetchUserCommunities();
    console.log(communites);
  },[]);
  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const payload = {
      userId: userId,
      description: data.description,
      location: data.location,
      image: imagePreview,
      availabilityStatus:"true",
      latitude: data.latitude,
      longitude: data.longitude,
      communityId: data.community
    };

    try {
      const response = await updatePost(post._id,payload);
      if (response.status!== 200) {
        throw new Error('Failed to create post');
      }
      alert('Post updated successfully');
      setIsEditable(false);
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
    <ModifyPostForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      imagePreview={imagePreview}
      onImageChange={handleImageChange}
      setValue={setValue}
      communities={communites}
    />
  );
};

export default ModifyPostContainer;