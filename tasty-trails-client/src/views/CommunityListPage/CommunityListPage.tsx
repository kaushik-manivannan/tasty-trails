import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import CommunityListContainer from "../../containers/CommunityListContainer.tsx";

const CommunityListPage: React.FC = () => {
    return (
        <div>
            <CommunityListContainer />
            <Sidebar />
        </div>
    );
};

export default CommunityListPage;