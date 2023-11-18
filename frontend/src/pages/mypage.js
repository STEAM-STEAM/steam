import React, {useState} from "react";
import styled from "@emotion/styled";
import MainItem from "../components/mainItem";
import Modal from 'react-modal';
import axios from 'axios';

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

const customModalStyles = {
    overlay: {
        backgroundColor: " rgba(0, 0, 0, 0.4)",
        width: "100vw",
        height: "100vh",
        zIndex: "10",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0"
    },
    content: {
        width: "400px",
        height: "auto",
        position: "relative",
        zIndex: "150",
        inset: "50% 0 0 50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
        margin: 0
    },
};

const ProfileInfo = () => {
    const publicUrl = process.env.PUBLIC_URL;

    const user = JSON.parse(sessionStorage.getItem("user")) ?? "";
    console.log(user);

    const [modalOpen, setModalOpen] = useState(false);

    const PopupMessage = () => {
        return (
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customModalStyles}
                ariaHideApp={false}
                contentLabel="Pop up Message"
                shouldCloseOnOverlayClick={false}
            >
                <div style={{width: "100%", float: "left", padding: 20, textAlign: "center"}}>
                    <p style={{fontSize: 22, fontWeight: 500, marginBottom: 10}}>키워드 추가하기</p>
                    <div style={{width: "100%", float: "left"}}>
                        <input placeholder="키워드를 입력해주세요."
                            style={{width: "100%", height: 40, border: "solid 1px #ddd", borderRadius: 5, padding: 10, marginBottom: 10}}
                        />
                    </div>
                    <button style={{width: 100, height: 40, background: "#fff", color: "#1DA1F2", border: "solid 1px #1DA1F2"}} onClick={() => setModalOpen(false)}>취소</button>
                    <button style={{width: 100, height: 40, background: "#1DA1F2", color: "#fff", border: "none", marginLeft: 10}} onClick={() => setModalOpen(false)}>확인</button>
                </div>
            </Modal>
    )}

    return (
        <Profile>
            <PopupMessage />
            <div>
                <div>
                    <p><b style={{fontSize: 18}}>{user.nickname}</b></p>
                    <p>활동지역 <b>{user.region}</b></p>
                </div>
                <div>
                    <img src={`${publicUrl}/assets/images/${user.profileImgUrl}`} alt="img" />
                </div>
            </div>
            <div>
                <span>관심 키워드</span>
                <KeywordBtn onClick={() => setModalOpen(true)}>키워드 추가</KeywordBtn>
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