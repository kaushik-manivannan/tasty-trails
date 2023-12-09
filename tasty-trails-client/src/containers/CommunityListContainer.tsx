import React,{useState,useEffect} from 'react';
import CommunityList from '../components/CommunityList/CommunityList.tsx';

const CommunityListContainer: React.FC = () => {
    const  [communities, setCommunities] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/communities')
          .then((response) => response.json())
          .then((data) => {
                setCommunities(data);
            })
          .catch((error) => {
                console.error('Error fetching communities:', error);
            });
    }, []);

    return <CommunityList communities={communities} />;
}

export default CommunityListContainer;