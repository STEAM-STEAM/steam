import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Search from "../components/search";
import MainItem from "../components/mainItem";
import Header from "../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
    return (
        <div style={{width: 1200, float: "left", left: "50%", transform: "translateX(-50%)"}}>
            <Search />
            <div style={{width: 1200, float: "left"}}>
                <WriteBtn><Link to="/write">게시글 작성</Link></WriteBtn>
            </div>
            <ItemContainer>
                <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
            </ItemContainer>
        </div>
    );
}

export default Index;