import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import UserProfileViewContainer from "../../containers/UserProfileViewContainer.tsx";

const UserProfileViewPage: React.FC = () => {
    return (
        <div>
            <UserProfileViewContainer />
            <Sidebar />
        </div>
    );
};

export default UserProfileViewPage;