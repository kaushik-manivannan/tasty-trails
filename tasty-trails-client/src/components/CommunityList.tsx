import React from 'react';
import { CommunityListProps } from '../interfaces/community-interfaces.tsx';
import  CommunityItem  from './CommunityItem.tsx';

const CommunityList : React.FC<CommunityListProps> = ({communities}) => {
    return (
        <div>
            <ul>
                {communities.map((community, idx) => {
                    return (<li><CommunityItem key={`community-${idx + 1}`} community={community} /></li>);
                    }   
                )}
            </ul>
        </div>
    );
}

export default CommunityList;