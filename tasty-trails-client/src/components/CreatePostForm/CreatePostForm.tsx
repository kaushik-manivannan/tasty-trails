import React from "react";
import { CreatePostFormProps } from "../../interfaces/post-interfaces";
import styles from "./CreatePostForm.module.scss";

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, register, errors = {}, imagePreview, onImageChange }) => {
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
        <label htmlFor="image" className={styles.inputLabel}>Image</label>
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
          Upload Image
        </button>
      </div>

      {imagePreview && (
        <div>
          <p className={styles.imagePreviewText}>Image Preview</p>
          <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
        </div>
      )}

      <div className={styles.inputContainer}>
        <label htmlFor="location" className={styles.inputLabel}>Location</label>
        <input
          id="location"
          className={styles.input}
          placeholder="Enter a location"
          {...register('location', {
            required: 'Please enter a location',
          })}
        />
        {errors.location && <p className={styles.errorMessage}>{errors.location.message}</p>}
      </div>

      <button type="submit" className={styles.createButton}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
