import React, { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { CommunityFormData } from '../../interfaces/community-interfaces';
import { NewCommunityProps } from '../../interfaces/community-interfaces';
import { useSelector } from 'react-redux';
import styles from './NewCommunity.module.scss';
import { useTranslation } from 'react-i18next';

const NewCommunity: React.FC<NewCommunityProps> = ({ postNewCommunity }) => {
  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<CommunityFormData>({
    mode: 'onChange', // errors will be displayed on change
  });

  // Redux selector to get the user ID
  const userId = useSelector((state: any) => state.auth.userId);

  // Use SubmitHandler with FormData
  const onSubmit: SubmitHandler<CommunityFormData> = (data) => {
    // Create an object to send to the server
    const payload = {
      communityName: data.communityName,
      communityAdmin: userId,
      description: data.description,
      image: imagePreview,
      members: [userId],
      postIds: []
    };
    postNewCommunity(payload);
  };

  // State for image preview
  const [imagePreview, setImagePreview] = useState<string>("");

  // Handle change of the image
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

  // Translation hook
  const { t } = useTranslation();

  return (
    <div className={styles.coverImage}>
      {/* Form for creating a new community */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>{t('Create Your Community')}</h2>

        {/* Image Upload */}
        <div className={styles.inputContainer}>
          <input
            id="image"
            type="file"
            {...register('image')}
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('image')?.click()}
            className={styles.fileUploadButton}
          >
            {imagePreview && (
              <div>
                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
              </div>
            )}
            {!imagePreview && <p>{t('Upload Image')}</p>}
          </button>
        </div>

        {/* Community Name Input */}
        <div className={styles.inputContainer}>
          <input
            id="communityName"
            className={styles.input}
            placeholder={t("Enter the name of your community")}
            {...register('communityName', {
              required: 'Community Name is required',
            })}
          />
          {errors.communityName && <p className={styles.errorMessage}>{errors.communityName.message}</p>}
        </div>

        {/* Description Input */}
        <div className={styles.inputContainer}>
          <textarea
            id="description"
            className={styles.textarea}
            placeholder={t("Enter a description of your community")}
            {...register('description', {
              required: 'Description is required',
            })}
          />
          {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
        </div>

        {/* Submit button */}
        <button type="submit" className={styles.createButton}>{t('Create Community')}</button>
      </form>
    </div>
  );
};

export default NewCommunity;