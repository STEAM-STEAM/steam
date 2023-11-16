import React from "react";
import styled from "@emotion/styled";
import MainItem from "../components/mainItem";


const Profile = styled.div`
    width: 20%;
    height: 100%;
    float: left;
    & > div {
        width: 100%;
        border-bottom: 1px solid #ddd;
        padding: 20px;
        float: left;
    }

    & > div > div {
        width: 70%;
        float: left;
    }
    & > div > div:last-of-type {
        width: 30%;
        float: left;
    }

    & img {
        width: 50px;
        height: 50px;
        float: right;
        border-radius: 50%;
    }
`;

const KeywordBtn = styled.button`
    float: right;
    border: 1px solid #1DA1F2;
    background: #fff;
    color: #1DA1F2;
`;

const Tag = styled.span`
    font-size: 14px;
    margin-right: 10px;
    color: #1DA1F2;
`;

const ProfileInfo = () => {
    const publicUrl = process.env.PUBLIC_URL;
    const profile_img = "image1.png";

    return (
        <Profile>
            <div>
                <div>
                    <p><b style={{fontSize: 18}}>유저 닉네임</b></p>
                    <p>활동지역 <b>대전</b></p>
                </div>
                <div>
                    <img src={`${publicUrl}/assets/images/${profile_img}`} alt="img" />
                </div>
            </div>
            <div>
                <span>관심 키워드</span>
                <KeywordBtn>키워드 추가</KeywordBtn>
            </div>
            <div>
                <Tag>#냉장고</Tag>
                <Tag>#TV</Tag>
                <Tag>#스타일러</Tag>
                <Tag>#건조기</Tag>
            </div>
        </Profile>
    );
}

const List = styled.div`
    width: 100%;
    float: left;
    padding: 30px;
    border-bottom: 1px solid #ddd;

    & > div a > img {
        height: 200px;
    }
`;

const ArticleContainer = () => {
    return (
        <div style={{width: "80%", float: "left", borderLeft: "1px solid #ddd"}}>
            <div style={{width: "100%", float: "left"}}>
                <div style={{width: "100%", float: "left", borderBottom: "1px solid #ddd"}}>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>관심 내역</p>
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>판매 진행 내역</p>
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>판매 완료 내역</p>
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>구매 신청 내역</p>
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>구매 완료 내역</p>
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                        <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                    </List>
                </div>
            </div>
        </div>
    );
}

const MyPage = () => {

    return (
        <div style={{width: "100%", float: "left"}}>
            <div style={{width: 1200, float: "left", left: "50%", transform: "translateX(-50%)"}}>
                <ProfileInfo />
                <ArticleContainer />
            </div>
        </div>
    );
}

export default MyPage;