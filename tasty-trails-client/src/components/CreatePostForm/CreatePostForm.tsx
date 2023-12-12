import React from "react";
import { PostFormProps } from "../../interfaces/post-interfaces";
import styles from "./CreatePostForm.module.scss";
import Location from "../Location/Location.tsx";
const CreatePostForm: React.FC<PostFormProps> = ({ onSubmit, register, errors = {}, imagePreview, onImageChange, communities, setValue }) => {
  return (
    <div className={styles.coverImage}>
      <form onSubmit={onSubmit} className={styles.form}>
      <h2 className={styles.heading}>Create your tasty trail</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="description" className={styles.inputLabel}>Description</label>
        <input
          id="description"
          className={styles.input}
          placeholder="Enter a description of your food"
          {...register('description', {
            required: 'Please enter a description',
          })}
        />
        {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="location" className={styles.inputLabel}>Location</label>
        <Location register = {register} errors={errors} setValue={setValue}/>
      </div>
      
      <div className={styles.inputContainer}>
        <label htmlFor="community" className={styles.inputLabel}>Community</label>
        <select
          id="community"
          className={styles.input}
          {...register('community', {})}
        >
          <option value="-1">Select a Community</option>
          {communities.map((community, index) => (
            <option key={community.communityName+index} value={community._id}>{community.communityName}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="image" className={styles.inputLabel}>Image</label>
        <input 
          type="file"
          id="image"
          {...register('image', {
            required: 'Please upload an image',
          })}
          accept=".jpg, .jpeg, .png"
          onChange={onImageChange}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => document.getElementById('image')?.click()}
          className={styles.fileUploadButton}
        >
          Upload Image
        </button>
      </div>
      {imagePreview && (
        <div>
          <p className={styles.imagePreviewText}>Image Preview</p>
          <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
        </div>
      )}

      <button type="submit" className={styles.createButton}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
