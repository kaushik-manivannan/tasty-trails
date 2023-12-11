import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import PostDetailsContainer from "../../containers/PostDetailsContainer.tsx";
import CommentListContainer from "../../containers/CommentListContainer.tsx";
import styles from './PostDetailsPage.module.scss';

const PostDetailsPage: React.FC = () => {
    return (
        <div>
            <PostDetailsContainer />
            <Sidebar />
        </div>
    );
};

export default PostDetailsPage;