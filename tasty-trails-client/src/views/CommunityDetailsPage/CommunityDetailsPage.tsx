import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import CommunityDetailsContainer from "../../containers/CommunityDetailsContainer.tsx";

const CommunityDetailsPage: React.FC = () => {
    return (
        <div>
            <CommunityDetailsContainer />
            <Sidebar />
        </div>
    );
};

export default CommunityDetailsPage;