import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import Modal from 'react-modal';
import Keyword from "../components/mypageKeyword";
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
    // 로그인 여부 확인
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) window.location.href = "/login";

    const publicUrl = process.env.PUBLIC_URL;
    const profile_img = "image1.png";

    const [modalOpen, setModalOpen] = useState(false);

    // 키워드 추가 팝업
    const PopupMessage = () => {
        const [keywordValue, setKeywordValue] = useState('');

        const addKeyword = () => {
            const data = {
                userId: user.userId,
                keyword: keywordValue
            }
    
            axios.post("/api/user/keyword", data).then((response) => {
                const data = response.data;
                if (data.message === "success") {
                    alert("키워드가 추가되었습니다.");
                    window.location.reload();
                } else {
                    alert("키워드 추가에 실패하였습니다.");
                }
            });
        }

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
                        <input 
                            placeholder="키워드를 입력해주세요."
                            style={{width: "100%", height: 40, border: "solid 1px #ddd", borderRadius: 5, padding: 10, marginBottom: 10}}
                            onChange={(e) => setKeywordValue(e.target.value)}
                        />
                    </div>
                    <button style={{width: 100, height: 40, background: "#fff", color: "#1DA1F2", border: "solid 1px #1DA1F2"}} onClick={() => setModalOpen(false)}>취소</button>
                    <button 
                        style={{width: 100, height: 40, background: "#1DA1F2", color: "#fff", border: "none", marginLeft: 10}} 
                        onClick={() => {
                            setModalOpen(false);
                            addKeyword();
                            }
                        }>
                        확인
                    </button>
                </div>
            </Modal>
        );
    }

    return (
        <Profile>
            <PopupMessage />
            <div>
                <div>
                    <p><b style={{fontSize: 18}}>{user.nickname}</b></p>
                    <p>활동지역 <b>{user.region}</b></p>
                </div>
                <div>
                    <img src={publicUrl+user.imgUrl} alt="img" />
                </div>
            </div>
            <div>
                <span>관심 키워드</span>
                <KeywordBtn onClick={() => setModalOpen(true)}>키워드 추가</KeywordBtn>
            </div>
            <div>
                <Keyword />
            </div>
        </Profile>
    );
}

export default ProfileInfo;