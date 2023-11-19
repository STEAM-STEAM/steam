import React from "react";
import Articles from "../components/mypageArticles";
import ProfileInfo from "../components/mypageProfileInfo";

const MyPage = () => {
    return (
        <div style={{width: "100%", float: "left"}}>
            <div style={{width: 1200, float: "left", left: "50%", transform: "translateX(-50%)"}}>
                <ProfileInfo />
                <Articles />
            </div>
        </div>
    );
}

export default MyPage;