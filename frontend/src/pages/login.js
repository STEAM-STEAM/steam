import React,{useState} from "react";
import styled from "@emotion/styled";
import Select from 'react-select'
import { Link } from "react-router-dom";
import axios from 'axios'

const LoginFrm = styled.div`
    width: 500px;
    margin-top: 50px;

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

    &:last-of-type {border-bottom: 1px solid #111}
    & > p {
        float: left;
        width: 100px;
        line-height: 35px;
    }
    & > div {
        float: left;
        width: calc(100% - 100px);
    }
    & > div > input {
        border: solid 1px #ddd;
        font-size: 14px;
        width: 100%;
        height: 35px;
        border-radius: 5px;
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

    const [userId, setId] = useState("");
    const [pw, setPw] = useState("");

    const login = () => {
        const data = {
            userId: userId,
            pw: pw
        };
        axios.post('http://localhost:8080/api/login', data).then(loginSuccess).catch(err => {
            alert("아이디 또는 비밀번호를 다시 확인해주세요.");
        });
    }

    const loginSuccess = (res) => {
        const message = res.data.message;
        if(message === "success") {
            userInfo();
        } else if (message === "id_error") {
            alert("아이디를 다시 확인해주세요.");
        } else if (message === "pw_error") {
            alert("비밀번호를 다시 확인해주세요.");
        }
    }

    // 로그인 성공시 유저 정보 요청
    const userInfo = () => {
        axios.get(`http://localhost:8080/api/user/info/${userId}`).then(res => {
            const user = JSON.stringify(res.data);
            sessionStorage.setItem("user", user);

            alert("로그인 성공");
            window.location.href = "/";
        });
    }

    return (
        <div style={{width: "100%", float: "left"}}>
            <LoginFrm>
                <p>로그인</p>
                <Item>
                    <p>아이디</p>
                    <div>
                        <input 
                            placeholder="아이디를 입력해주세요." 
                            onChange={(e) => setId(e.target.value)} 
                            required 
                        />
                    </div>
                </Item>
                <Item>
                    <p>비밀번호</p>
                    <div>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            onChange={(e) => setPw(e.target.value)}
                            required
                        />
                    </div>
                </Item>
                <Item>
                    <Btn onClick={() => login()}>로그인</Btn>
                </Item>
            </LoginFrm>
        </div>
    );
}

export default Login;