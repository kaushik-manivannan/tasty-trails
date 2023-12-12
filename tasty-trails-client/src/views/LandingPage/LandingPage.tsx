import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import PostListContainer from "../../containers/PostListContainer.tsx";
import styles from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
    return (
        <div>
            {/* <h2 className={styles.heading}>Explore Tasty Trails</h2> */}
            <PostListContainer />
            <Sidebar />
        </div>
    );
};

export default LandingPage;