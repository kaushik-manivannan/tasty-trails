import React ,{useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import CommunityDetails from '../components/CommunityDetails/CommunityDetails.tsx';
import { getAllCommunityDetailsById } from '../api/index.js';
import { useSelector } from 'react-redux';
import {updateCommunityById} from '../api/index.js';


const CommunityDetailsContainer:React.FC =()=>{
    const [community, setCommunity] = useState(null);
    const [PostList,setPostList] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const {communityId} = useParams();
    const userId = useSelector((state:any) => state.auth.userId);
    const updateCommunity = async (payload:any) => {
      try {
        const response = await updateCommunityById(communityId,payload);
        if(response.status!== 200){
          throw new Error(`Error occured while fetching communities with response : ${response.data}`);
        }
        setCommunity(response.data);
      } catch (error) {
        throw new Error(`Error occured while fetching communities Error`);
      }
    };
    const fetchPostByCommunityId = async () => {
        try {
            const response = await getAllCommunityDetailsById(communityId);
            if(response.status !== 200){
            throw new Error("Failed to fetch get the community details");
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
    return (<>{community && <CommunityDetails community={community} postList ={PostList} isEditable={isEditable} updateCommunityById={updateCommunity}/>}</>);
}
export default CommunityDetailsContainer;