export interface Comment {
    _id: {
      $oid: string;
    };
    userId: string;
    postId: string;
    comment: string;
    dateTime: string;
    image: string;
  }
  
export interface CommentItemProps {
    comment: Comment;
  }

export interface CommentListProps {
  comments: Comment[];
}

export interface CommentItemProps {
  commentValue: CommentItemProps['commentValue'];
  onEdit: CommentItemProps['onEdit'];
  onDelete: CommentItemProps['onDelete'];
}