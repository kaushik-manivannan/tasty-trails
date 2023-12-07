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