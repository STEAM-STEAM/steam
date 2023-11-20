import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Select from 'react-select'
import axios from 'axios'
import { Link } from "react-router-dom";

const Item = styled.div`
    width: 100%;
    float: left;
    height: 40px;
    padding: 0 50px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;

    &:first-of-type{
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
    }
`;
const Btn = styled.button`
    padding: 0 20px;
    height: 30px;
    color: #1DA1F2;
    background: white;
    border: 1px solid #1da1f2;
`;
const Para = styled.td`
    padding: 0 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    height: 40px;

`;

const SetBlackList = ( user ) => {
    const userId = user.userId;

    axios.delete(`http://localhost:8080/api/admin/blacklist/add/${userId}`).then((response) => {
        console.log(response.data);
        if (response.data.message == "success") {
            alert("블랙리스트 등록 완료");
            window.location.reload();
        } else {
            alert("블랙리스트 등록 실패");
        }
    });
};

const User = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/users").then((response) => {
            console.log(response.data);

            setUserData(response.data);
        });
    }, []);

    return (
        <div style={{ marginTop: 30, float: "left", width: "100%" }}>
            <p style={{ fontSize: 22, fontWeight: "bold" }}>유저 조회</p>
            <table style={{width: "100%", borderTop:"1px solid #222", marginTop:10}}>
                    <tr style={{ borderTop: "1px solid #222" }}>
                        <Para><b>프로필 이미지</b></Para>
                        <Para><b>유저 아이디</b></Para>
                        <Para><b>유저 닉네임</b></Para>
                        <Para><b>유저 활동지역</b></Para>
                        <Para><b>블랙리스트 지정</b></Para>
                    </tr>
                    {userData.map((user) => (
                        <tr >
                            <Para><img src={user.imgLinkUrl} style={{ width: "30px", height: "30px", borderRadius: "50%" }} /></Para>
                            <Para>{user.userId}</Para>
                            <Para>{user.nickname}</Para>
                            <Para>{user.Region}</Para>
                            <Para><Btn onClick={() => SetBlackList(user)}>지정하기</Btn></Para>
                        </tr>
                    ))}
            </table>
        </div>
    );
}

const BlackList = () => {
    const [blackData, setBlackData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/blacklist").then((response) => {
            console.log(response.data)
            setBlackData(response.data);
        });
    }, []);
    return (
        <div style={{ marginTop: 30, float: "left", width: "100%" }}>
            <p style={{ fontSize: 22, fontWeight: "bold" }}>블랙리스트 유저 조회</p>
            <table style={{width: "100%", borderTop:"1px solid #222", marginTop:10}}>
                <tr style={{ borderTop: "1px solid #222"}}>
                    <Para><b>프로필 이미지</b></Para>
                    <Para><b>유저 아이디</b></Para>
                    <Para><b>유저 닉네임</b></Para>
                    <Para><b>유저 활동지역</b></Para>
                </tr>
                {blackData.map((user) => (
                    <tr>
                        <Para><img src={user.imgLinkUrl} style={{width: "30px", height: "30px", borderRadius: "50%" }} /></Para>
                        <Para>{user.userId}</Para>
                        <Para>{user.nickname}</Para>
                        <Para>{user.Region}</Para>
                    </tr>
                ))}
            </table>
        </div>
    );
}

const Admin = () => {
    return (
        <div style={{ width: "100%", float: "left" }}>
            <div style={{ width: 800, float: "left", left: "50%", transform: "translateX(-50%)", marginTop: 50 }}>
                <User />
                <BlackList />
            </div>
        </div>
    );
}

export default Admin;