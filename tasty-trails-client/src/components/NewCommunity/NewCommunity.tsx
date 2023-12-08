import React,{useState} from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import {CommunityFormData} from '../../interfaces/community-interfaces';
import {NewCommunityProps} from '../../interfaces/community-interfaces';
import styles from './NewCommunity.module.scss';

const NewCommunity: React.FC<NewCommunityProps> = ({postNewCommunity}) => {
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
    };
    postNewCommunity(payload);
  };
  const [imagePreview, setImagePreview] = useState<string>("");

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
    <div className={styles.coverImage}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.heading}>Create your community</h2>
      {/* Community Name */}
      <div className={styles.inputContainer}>
        <label htmlFor="communityName" className={styles.inputLabel}>Community Name</label>
          <input
            id="communityName"
            className={styles.input}
            placeholder="Enter the name of your community"
            {...register('communityName', {
              required: 'Community Name is required',
            })}
          />
          {errors.communityName && <p className={styles.errorMessage}>{errors.communityName.message}</p>}
      </div>

      {/* Description */}
      <div className={styles.inputContainer}>
        <label htmlFor="description" className={styles.inputLabel}>Description</label>
          <input
            id="description"
            className={styles.input}
            placeholder="Enter a description of your community"
            {...register('description', {
              required: 'Description is required',
            })}
          />
          {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
      </div>

      {/* Image (optional) */}
      <div className={styles.inputContainer}>
        <label htmlFor="image" className={styles.inputLabel}>Image</label>
          <input 
            id="image"
            type="file"
            {...register('image')}
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleImageChange}
            style={{display: "none"}}
          />
          <button
          type="button"
          onClick={() => document.getElementById('image')?.click()}
          className={styles.fileUploadButton}
        >
          Upload Image
        </button>
      </div>

        {/* Image Preview */}
        {imagePreview && (
        <div>
          <p className={styles.imagePreviewText}>Community Image Preview</p>
          <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
        </div>
      )}

      {/* Submit button */}
      <button type="submit" className={styles.createButton}>Create Community</button>
      </form>
    </div>
  );
};

export default NewCommunity;
