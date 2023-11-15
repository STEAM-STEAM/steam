import React,{useEffect, useState} from "react";
import styled from "@emotion/styled";
import Select from 'react-select'
import axios from 'axios'
// import { Link } from "react-router-dom";
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

const Join = () => {
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');
    const [region, setRegion] = useState('서울');
    const [nickname, setNickname] = useState('');

    // useEffect(() => {
    //     console.log(userId, pw, region, nickname);
    // }
    // , [userId, pw, region, nickname]);

    const join = () => {
        axios.post('http://localhost:8080/api/join', {
            userId: userId,
            pw: pw,
            region: region,
            nickname: nickname
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            console.log(res);
        }
        )
        .catch((err) => {
            console.log(err);
        });
    }

    const options = [
        { value: '서울', label: '서울' },
        { value: '인천', label: '인천' },
        { value: '광주', label: '광주' },
        { value: '부산', label: '부산' },
        { value: '대구', label: '대구' },
        { value: '울산', label: '울산' }
    ];

    return (
        <div style={{width: 800, float: "left", left: "50%", transform: "translateX(-50%)"}}>
            <JoinFrm>
                <p>회원가입</p>
                <Item>
                    <p>아이디</p>
                    <div>
                        <input placeholder="아이디를 입력해주세요." onChange={(e) => setUserId(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <p>비밀번호</p>
                    <div>
                        <input placeholder="비밀번호를 입력해주세요." type="password" onChange={(e) => setPw(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <p>활동지역</p>
                    <div>
                        <Select 
                            options={options} 
                            placeholder="활동지역을 선택해주세요." 
                            onChange={(e) => setRegion(e.value)}
                            value={options.filter(function (val) {
                                return val.value === region;
                            })}
                            required 
                        />
                    </div>
                </Item>
                <Item>
                    <p>닉네임</p>
                    <div>
                        <input placeholder="닉네임을 입력해주세요." onChange={(e) => setNickname(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <Btn onClick={() => join()}>등록하기</Btn>
                </Item>
            </JoinFrm>
        </div>
    );
}

export default Join;