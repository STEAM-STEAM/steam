import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 1200px;
    float: left;
    left : 50%;
    transform: translateX(-50%);
    height: 75px;
    float: left;
    
    & > a {
        margin-left: 20px;
        float: right;
        line-height: 75px;
    }
`;

const HeaderContainer = styled.div`
    width: 100%;
    float: left;
    border-bottom: 1px solid #ddd;
    box-shadow: rgba(206, 206, 206, 0.5) 0px 2px 4px 0px;
    position: fixed;
    background: #fff;
    z-index: 1;
`;

const Header = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    return (
        <HeaderContainer>
            <Container>
                {!user && <Link to="/login">로그인</Link>}
                {!user && <Link to="/join">회원가입</Link>}
                {user && <Link to="/mypage">마이페이지</Link>}
                {user && <Link to="/logout">로그아웃</Link>}
                <Link to="/">메인페이지</Link>
            </Container>
        </HeaderContainer>
    );
}

export default Header;