import React from "react";
import styled from "@emotion/styled";
import Select from 'react-select'
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-regular-svg-icons";

const JoinFrm = styled.div`
    width: 100%;

    & > p {
        font-size: 22px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid #111;
    }
`;

const Item = styled.div`
    width: 100%;
    padding: 15px;
    position: relative;
    border-bottom: 1px solid #ddd;
    float: left;

    &:last-of-type {
        border-bottom: 1px solid #111
    }

    & > p {
        float: left;
        width: 150px;
        line-height: 35px;
    }
    & > div {
        float: left;
        width: calc(100% - 150px);
    }
    & > div > input {
        width: 100%;
        height: 35px;
    }
`;

const Btn = styled.button`
    width: 200px;
    height: 40px;
    background: #1DA1F2;
    color: white;
    border: none;
    float: right;
`;

const Login = () => {

    return (
        <div style={{width: 800, float: "left", left: "50%", transform: "translateX(-50%)"}}>
            <JoinFrm>
                <p>로그인</p>
                <Item>
                    <p>아이디</p>
                    <div>
                        <input placeholder="아이디를 입력해주세요." />
                    </div>
                </Item>
                <Item>
                    <p>비밀번호</p>
                    <div>
                        <input placeholder="비밀번호를 입력해주세요." />
                    </div>
                </Item>
                <Item>
                    <Btn>로그인</Btn>
                </Item>
            </JoinFrm>
        </div>
    );
}

export default Login;