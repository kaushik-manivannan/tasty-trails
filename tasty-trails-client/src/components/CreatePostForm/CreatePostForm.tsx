import React from "react";
import { PostFormProps } from "../../interfaces/post-interfaces";
import styles from "./CreatePostForm.module.scss";
import Location from "../Location/Location.tsx";
import { useTranslation } from 'react-i18next';
const CreatePostForm: React.FC<PostFormProps> = ({ onSubmit, register, errors = {}, imagePreview, onImageChange, communities, setValue }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.coverImage}>
      <form onSubmit={onSubmit} className={styles.form}>
      <h2 className={styles.heading}>{t('Create Your Tasty Trail')}</h2>

        {/* Input for uploading an image */}
        <div className={styles.inputContainer}>
          <input 
            type="file"
            id="image"
            {...register('image', {
              required: 'Please upload an image',
            })}
            accept=".jpg, .jpeg, .png, .gif"
            onChange={onImageChange}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('image')?.click()}
            className={styles.fileUploadButton}
          >
            {/* Display image preview if available */}
            {imagePreview && (
              <div>
                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
              </div>
            )}
            {/* Display upload message if no image is selected */}
            {!imagePreview && <p>{t('Upload Image')}</p>}
          </button>
        </div>

        {/* Input for entering a description */}
        <div className={styles.inputContainer}>
          <textarea
            id="description"
            className={styles.textarea}
            placeholder={t("Enter a description of your food")}
            {...register('description', {
              required: 'Please enter a description',
            })}
          />
          {/* Display error message if description is not provided */}
          {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
        </div>

        {/* Input for selecting location */}
        <div className={styles.inputContainer}>
          <Location register={register} errors={errors} setValue={setValue} />
        </div>
        
        {/* Input for selecting a community */}
        <div className={styles.inputContainer}>
          <select
            id="community"
            className={styles.input}
            {...register('community', {})}
          >
            <option value="-1">{t('Select a Community')}</option>
            {/* Map through communities to create options */}
            {communities.map((community, index) => (
              <option key={community.communityName + index} value={community._id}>{community.communityName}</option>
            ))}
          </select>
        </div>

      <button type="submit" className={styles.createButton}>{t('Create Post')}</button>
      </form>
    </div>
  );
};

export default CreatePostForm;