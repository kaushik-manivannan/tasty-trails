export interface Post {
    _id: {
      $oid: string;
    };
    userId: string;
    image: string;
    description: string;
    location: string;
    availabilityStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostItemProps {
    post: Post;
}

export interface PostListProps {
    posts: Post[];
}

export interface PostFormData {
    description: string;
    location: string;
    availabilityStatus: string;
    image?: FileList | null; // Use FileList type for file input
}