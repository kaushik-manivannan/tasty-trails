import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import CreatePostContainer from "../../containers/CreatePostContainer.tsx";

const CreatePostPage: React.FC = () => {
    return (
        <div>
            <CreatePostContainer />
            <Sidebar />
        </div>
    );
};

export default CreatePostPage;