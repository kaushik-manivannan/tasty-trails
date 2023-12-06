import React,{useState} from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import {CommunityFormData} from '../interfaces/community-interfaces';

const NewCommunity: React.FC = () => {
  // Use the correct generic type for useForm
  const { register, handleSubmit, formState: { errors } } = useForm<CommunityFormData>({
    mode: 'onChange', // errors will be displayed on change
  });

  // Use SubmitHandler with FormData
  const onSubmit: SubmitHandler<CommunityFormData> = (data) => {
    // Create an object to send to the server
    const payload = {
        communityName: data.communityName,
        description: data.description,
        image: imagePreview,
        communityAdmin:'1'
    };
    fetch('http://localhost:8080/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) // Convert the payload into a JSON string
    }).then((response) => response.json())
    .catch((error) =>console.log(error));
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Community Name */}
      <label>
        Community Name:
        <input
          {...register('communityName', {
            required: 'Community Name is required',
          })}
        />
        {errors.communityName && <p>{errors.communityName.message}</p>}
      </label><br/>

      {/* Description */}
      <label>
        Description:
        <input
          {...register('description', {
            required: 'Description is required',
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </label><br/>

      {/* Image (optional) */}
      <label>
        Image:
        <input 
          type="file"
          {...register('image')}
          accept=".jpg, .jpeg, .png, .gif"
          onChange={handleImageChange}
        />
      </label><br/>

        {/* Image Preview */}
        {imagePreview && (
        <div>
          <p>Image Preview:</p>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </div>
      )}

      {/* Submit button */}
      <button type="submit">Create Community</button>
    </form>
  );
};

export default NewCommunity;
