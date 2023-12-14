export interface NewCommentProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  commentChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddComment: (event: React.FormEvent) => void;
  handleEmojiClick: (event: any, emojiObject: any) => void;
  toggleEmojiPicker: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  emojiPickerVisible: boolean;
  selectedImage: string;
  userImage?: string;
}


  export interface NewCommentContainerProps {
    userId: string;
    userName: string;
    postId: string | undefined;
    addComment: (newComment: any) => void; // Replace 'any' with the actual type of newComment
    userImage: string;
  }