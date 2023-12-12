import { SubmitHandler, UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";
import {Community} from "../interfaces/community-interfaces";
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
    onSearch: (query: string) => void;
}

export interface PostFormData {
    description: string;
    location: string;
    availabilityStatus: string;
    image?: string;
    community?: string;
    latitude?: Number;
    longitude?: Number;
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
    communities:Community[];
    setValue: UseFormSetValue<PostFormData>;
}