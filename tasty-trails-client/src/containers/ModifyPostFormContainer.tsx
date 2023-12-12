import React, { useState,useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import ModifyPostForm from "../components/ModifyPostForm/ModifyPostForm";
import { PostFormData,ModifyPostContainerProps } from "../interfaces/post-interfaces";
import {useSelector} from'react-redux';
import {getuserCommunities} from "../api/index.js";
import {updatePost} from "../api/index.js";

/**
 * 
 * This component is called when you want to modify a post
 * @param {setIsOnEdit, post}  setIsOnEdit is called to set isonedit false after the post has been modified
 *  
 */
const ModifyPostContainer: React.FC<ModifyPostContainerProps> = ({setIsOnEdit, post}) => {
  // This is form for modifying the post 
  const { register, handleSubmit, formState: { errors },setValue } = useForm<PostFormData>({
    mode: 'onChange',
  });
  const [communites, setCommunities] = useState([]);
  const userId = useSelector((state:any) => state.auth.userId);
  
  // function to fetch all communities of the user 
  const fetchUserCommunities = async () => {
    const resposne = await getuserCommunities(userId);
    try{
      if(resposne.status !== 200) {
        throw new Error("error occured while fetching communities of specific user");
      }
      setCommunities(resposne.data);
      updateFormValues(); // to update the form values
    }catch(error){
      throw new Error("error occured while fetching communities of specific user");
    }
  }
  
  // This function is called after fetching the values from the DB to update the form values
  const updateFormValues = () => {
    setValue('description', post.description);
    setValue('location', post.location);
    setImagePreview(post.image);
    setValue('community', post.communityId);
    if(post.image){
      setValue('image', "/DummyPath/image.jpg");  // added dummy value for image path sinse we are seting teh image preview
    }
  }
  useEffect(() => {
    fetchUserCommunities();
    console.log(communites);
  },[]);

  // Function to call when a form is submitted
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

    // send the request to the API to update the post
    try {
      const response = await updatePost(post._id,payload);
      if (response.status!== 200) {
        throw new Error('Failed to create post');
      }
      alert('Post updated successfully');
      setIsOnEdit(false);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to create post');
    }
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // function to the handle the image preview, get the file and read it into base 64
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