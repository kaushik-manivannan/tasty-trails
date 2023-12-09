import React ,{useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import CommunityDetails from '../components/CommunityDetails/CommunityDetails.tsx';
import { getAllCommunityDetailsById } from '../api/index.js';
import { useSelector } from 'react-redux';

const CommunityDetailsContainer:React.FC =()=>{
    const [community, setCommunity] = useState(null);
    const [PostList,setPostList] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const {communityId} = useParams();
    const userId = useSelector((state:any) => state.auth.userId);
    const fetchPostByCommunityId = async () => {
        try {
            const response = await getAllCommunityDetailsById(communityId);
            if(response.status !== 200){
            throw new Error("Failed to fetch posts.");
            }
            setCommunity(response.data.community);
            setPostList(response.data.posts);
            if (response.data.community.communityAdmin==userId) {
                setIsEditable(true);
            }
        } catch(error){
            console.log("Error fetching CommunityDetails: ", error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Call your data fetching function here
            await fetchPostByCommunityId();
          } catch (error) {
            console.log("Error fetching data: ", error);
          }
        };
      
        fetchData();
      }, [communityId]); 
    return (<>{community && <CommunityDetails community={community} postList ={PostList} isEditable={isEditable}/>}</>);
}
export default CommunityDetailsContainer;