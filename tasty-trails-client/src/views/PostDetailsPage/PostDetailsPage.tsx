import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import PostDetailsContainer from "../../containers/PostDetailsContainer.tsx";

const PostDetailsPage: React.FC = () => {
    return (
        <div>
            <PostDetailsContainer />
            <Sidebar />
        </div>
    );
};

export default PostDetailsPage;