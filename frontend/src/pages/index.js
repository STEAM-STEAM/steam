import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Search from "../components/search";
import MainItem from "../components/mainItem";
import axios from 'axios'

const WriteBtn = styled.button`
    width: 150px;
    height: 40px;
    background: #1DA1F2;
    color: white;
    border: none;
    border-radius: 5px;
    float: right;
    margin-top: 30px;
    font-size: 16px;
    & > a {
        color: white;
    }
`;

const ItemContainer = styled.div`
    width: 100%;
    float: left;
`;

const Index = () => {
    const [articleData, setArticleData] = useState([]);

    // region이 아니라 로그인 여부로 판단
    const user = JSON.parse(sessionStorage.getItem("user"));
    const region = user ? "/"+user.region : "";

    // axios.get(`http://localhost:8080/api/articles/recent${region}`).then((response) => {
    //     const data = response.data;
    //     setArticleData(data);
    // });

    const handleDataChange = (data) => {
        setArticleData(data);
    }

    return (
        <div style={{ width: 1200, float: "left", left: "50%", transform: "translateX(-50%)" }}>
            <Search onDataChange={handleDataChange} />
            <div style={{ width: 1200, float: "left" }}>
                <WriteBtn><Link to="/write">게시글 작성</Link></WriteBtn>
            </div>
            <ItemContainer>
                {/* <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} /> */}
                {articleData.map((data) => (
                    <MainItem
                        articleId={data.articleId}
                        title={data.title}
                        price={data.price}
                        userNickname={data.userNickname}
                        imgLinkUrl={data.imgLinkUrl}
                    />
                ))}
            </ItemContainer>
        </div>
    );
}

export default Index;