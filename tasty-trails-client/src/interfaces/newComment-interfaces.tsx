export interface NewCommentProps {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    commentChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addCommentHandler: () => void;
    handleEmojiClick: (event: any, emojiObject: any) => void;
    toggleEmojiPicker: () => void;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: () => void;
    emojiPickerVisible: boolean;
    selectedImage: string;
    userImage?: string; 
  }