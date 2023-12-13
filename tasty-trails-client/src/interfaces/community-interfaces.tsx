import {Post} from './post-interfaces';
export interface Community{
    _id: string;
    communityName: string;
    description: string;
    communityAdmin: string;
    image?:string;
    members:string[];
    postIds?:string[];
         
}

export interface CommunityListProps{
    communities: Community[];
    isLoading : boolean;
}

export interface CommunityItemContainerProps{
    community: Community;
}
export interface CommunityItemProps{
    community: Community;
    toggleJoin: Function;
    viewDetails: Function;
}
// Define form data interface
export interface CommunityFormData {
    communityName: string;
    description: string;
    image?: string;
    communityAdmin?:string;
    members?:string[];
    postIds?:string[];
}

export interface NewCommunityProps {
    postNewCommunity: (payload: CommunityFormData) => void;
}

export interface CommunityDetailsProps{
    community: Community;
    postList: Post[];
    isEditable: boolean;
    updateCommunityById:Function
}