import React,{useEffect, useState} from "react";
import styled from "@emotion/styled";
import Select from 'react-select'
import axios from 'axios'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";

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
    height: 65px;
    padding: 15px;
    position: relative;
    border-bottom: 1px solid #ddd;
    float: left;

    &:last-of-type {
        height: 70px;
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
const Label = styled.label`
    border: 1px solid #1DA1F2;
    color: #1DA1F2;
    cursor: pointer;
    float: left;
    height: 35px;
    display: block;
    width: 120px;
    text-align: center;
    line-height: 35px;
`;

const Join = () => {
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');
    const [region, setRegion] = useState('서울');
    const [nickname, setNickname] = useState('');
    const [image, setImage] = useState(null);

    const [imageName, setImageName] = useState('');

    // useEffect(() => {
    //     console.log(userId, pw, region, nickname);
    // }
    // , [userId, pw, region, nickname]);

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
        // const imageLists = e.target.files;
        // let imageUrlLists = [...images];
    
        // for (let i = 0; i < imageLists.length; i++) {
        //     const currentImageUrl = URL.createObjectURL(imageLists[i]);
        //     imageUrlLists.push(currentImageUrl);
        // }
    
        // if (imageUrlLists.length > 10) {
        //     imageUrlLists = imageUrlLists.slice(0, 10);
        // }
    
        // setImages(imageUrlLists);
    };

    const join = () => {
        if (userId.length < 8) {
            alert('아이디는 8자 이상이어야 합니다.');
            return;
        } else if (pw.length < 8) {
            alert('비밀번호는 8자 이상이어야 합니다.');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('pw', pw);
        formData.append('region', region);
        formData.append('nickname', nickname);
        formData.append('image', image);

        axios.post('http://localhost:8080/api/join', {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            const message = res.data.message;
            if (message == 'success') {
                alert('회원가입이 완료되었습니다.');
                window.location.href = '/';
            } else if (message == 'id_error') {
                alert('이미 존재하는 아이디입니다.');
            }
            console.log(res);
        }
        )
        .catch((err) => {
            alert("회원가입에 실패하였습니다.");
            console.log(err);
        });

        // axios.post('http://localhost:8080/api/join', {
        //     userId: userId,
        //     pw: pw,
        //     region: region,
        //     nickname: nickname,
        //     image: image
        // },
        // {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        // })
        // .then((res) => {
        //     const message = res.data.message;
        //     if (message == 'success') {
        //         alert('회원가입이 완료되었습니다.');
        //         window.location.href = '/';
        //     } else if (message == 'id_error') {
        //         alert('이미 존재하는 아이디입니다.');
        //     }
        //     console.log(res);
        // }
        // )
        // .catch((err) => {
        //     alert("회원가입에 실패하였습니다.");
        //     console.log(err);
        // });
    }

    const options = [
        { value: '서울', label: '서울' },
        { value: '인천', label: '인천' },
        { value: '대전', label: '대전' },
        { value: '광주', label: '광주' },
        { value: '부산', label: '부산' },
        { value: '대구', label: '대구' },
        { value: '울산', label: '울산' }
    ];

    return (
        <div style={{width: 800, float: "left", left: "50%", transform: "translateX(-50%)", marginTop: 50}}>
            <JoinFrm>
                <p>회원가입</p>
                <Item>
                    <p>아이디<span style={{color: "red"}}> *</span></p>
                    <div>
                        <input placeholder="아이디를 입력해주세요." onChange={(e) => setUserId(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <p>비밀번호<span style={{color: "red"}}> *</span></p>
                    <div>
                        <input placeholder="비밀번호를 입력해주세요." type="password" onChange={(e) => setPw(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <p>활동지역<span style={{color: "red"}}> *</span></p>
                    <div>
                        <Select 
                            options={options} 
                            placeholder="활동지역을 선택해주세요." 
                            onChange={(e) => setRegion(e.value)}
                            value={options.filter((val) => {
                                return val.value === region;
                            })}
                            required 
                        />
                    </div>
                </Item>
                <Item>
                    <p>닉네임<span style={{color: "red"}}> *</span></p>
                    <div>
                        <input placeholder="닉네임을 입력해주세요." onChange={(e) => setNickname(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <p>프로필 사진</p>
                    <div style={{float:"left"}}>
                        <Label>
                            이미지 선택
                            <input 
                                hidden 
                                type="file" 
                                accept="image/*" 
                                onChange={onChangeImage} 
                            />
                        </Label>
                        <span style={{paddingLeft: 10, lineHeight: "35px"}}>{imageName}</span>
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