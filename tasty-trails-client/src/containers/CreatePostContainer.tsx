import React, { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import { PostFormData } from "../interfaces/post-interfaces";

const CreatePostContainer: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const payload = {
      description: data.description,
      location: data.location,
      image: imagePreview
    };

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error(error);
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
    />
  );
};

export default CreatePostContainer;