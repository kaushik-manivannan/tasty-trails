import { SubmitHandler, UseFormRegister} from "react-hook-form";

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
    image?: string;
}

export interface CreatePostFormProps {
    onSubmit: SubmitHandler<any>;
    register: UseFormRegister<PostFormData>;
    errors: {
      description?: {
        message?: string;
      };
      location?: {
        message?: string;
      };
    };
    imagePreview: string | null;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}