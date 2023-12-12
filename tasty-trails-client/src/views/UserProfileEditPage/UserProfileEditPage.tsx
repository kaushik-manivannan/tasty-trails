import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import UserProfileEditContainer from "../../containers/UserProfileEditContainer.tsx";

const UserProfileEditPage: React.FC = () => {
    return (
        <div>
            <UserProfileEditContainer />
            <Sidebar />
        </div>
    );
};

export default UserProfileEditPage;