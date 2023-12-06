export interface Community{
    _id: {
        $oid: string;
        };
    communityName: string;
    description: string;
    communityAdmin: string;
    image:string;
    members:string[];
         
}

export interface CommunityListProps{
    communities: Community[];
}

export interface CommunityItemProps{
    community: Community;
}

// Define form data interface
export interface CommunityFormData {
    communityName: string;
    description: string;
    image?: string;
  }