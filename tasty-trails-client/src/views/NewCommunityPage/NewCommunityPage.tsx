import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import NewCommunityContainer from "../../containers/NewCommunityContainer";

const NewCommunityPage: React.FC = () => {
    return (
        <div>
            <NewCommunityContainer />
            <Sidebar />
        </div>
    );
};

export default NewCommunityPage;