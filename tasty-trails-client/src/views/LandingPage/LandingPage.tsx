import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import PostListContainer from "../../containers/PostListContainer.tsx";

const LandingPage: React.FC = () => {
    return (
        <div>
            <PostListContainer />
            <Sidebar />
        </div>
    );
};

export default LandingPage;