export interface Comment {
  userImage?: string;
  _id: {
    $oid: string;
  };
  userId: string;
  postId: string;
  comment: string;
  dateTime: string;
  image: string;
  userName: string;
}

export interface CommentItemProps {
  commentValue:Comment;
  showOptions: boolean;
  showDelete: boolean;  
  isEditing: boolean;  
  editedComment: string;  
  toggleOptions: () => void;  
  modifyHandler: () => void;  
  handleEdit: () => void;  
  handleCancelEdit: () => void;  
  handleSaveEdit: () => void;  
  onDelete: () => void;  
  mouseEnterHandler: () => void;  
  mouseLeaveHandler: () => void;  
  editCommentHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

}

export interface CommentListProps {
comments: Comment[];
}

export interface CommentItemProps1 {
commentValue: Comment;
onEdit: (editedComment: string) => void;
onDelete: () => void;
}