import { SubmitHandler, UseFormRegister, UseFormSetValue } from "react-hook-form";
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
    communityId: string;
    latitude: number;
    longitude: number;
}

export interface PostItemProps {
    post: Post;
}

export interface PostListProps {
    posts: Post[];
    onSearch: (query: string) => void;
    isLoading?: boolean;
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

export interface PostFormProps {
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

export interface ModifyPostContainerProps{
  setIsOnEdit: Function;
  post: Post;
  setPost: any;
}

export interface PostDetailsProps{
  post: Post;
  onDelete: Function;
  canModify: boolean;
  setPost?: Function;
}