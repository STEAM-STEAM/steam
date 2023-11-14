import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
    width: 1200px;
    float: left;
    left : 50%;
    transform: translateX(-50%);
    height: 50px;
    border-bottom: 1px solid #ddd;
    float: left;
    margin-top: 20px;
    margin-bottom: 100px;
    
    & > a {
        margin-left: 20px;
        float: right;
    }
`;

const Header = () => {
    return (
        <Container>
            <Link to="/join">회원가입</Link>
            <Link to="/login">로그인</Link>
        </Container>
    );
}

export default Header;