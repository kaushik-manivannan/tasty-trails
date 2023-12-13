import React from "react";
import { PostFormProps } from "../../interfaces/post-interfaces";
import styles from "./ModifyPostForm.module.scss";
import Location from "../Location/Location.tsx";
import { useTranslation } from 'react-i18next';

const ModifyPostForm: React.FC<PostFormProps> = ({ onSubmit, register, errors = {}, imagePreview, communities, setValue }) => {
  // Translation hook
  const { t } = useTranslation();

  return (
    <div>
      {/* Edit Post Form */}
      <form onSubmit={onSubmit} className={styles.form}>
        {/* Heading */}
        <h2 className={styles.heading}>{t('Modify Post')}</h2>

        {/* Image preview */}
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
          </div>
        )}

        {/* Description input */}
        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.inputLabel}>{t('Description')}</label>
          <input
            id="description"
            className={styles.input}
            placeholder={t("Enter a description of your food")}
            {...register('description', {
              required: 'Please enter a description',
            })}
          />
          {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
        </div>

        {/* Location input */}
        <div className={styles.inputContainer}>
          <label htmlFor="location" className={styles.inputLabel}>{t('Location')}</label>
          <Location register={register} errors={errors} setValue={setValue}/>
        </div>
        
        {/* Community selection */}
        <div className={styles.inputContainer}>
          <label htmlFor="community" className={styles.inputLabel}>{t('Community')}</label>
          <select
            id="community"
            className={styles.input}
            {...register('community', {})}
          >
            <option value="-1">{t('Select a Community')}</option>
            {communities.map((community, index) => (
              <option key={community.communityName + index} value={community._id}>{community.communityName}</option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button type="submit" className={styles.createButton}>{t('Modify Post')}</button>
      </form>
    </div>
  );
};

export default ModifyPostForm;