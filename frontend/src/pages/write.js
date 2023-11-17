import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import axios from 'axios'
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faSatelliteDish } from "@fortawesome/free-solid-svg-icons";
import Login from "./login";

const WriteFrm = styled.form`
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

    & > div > textarea {
        padding: 10px;
        width: 100%;
        height: 200px;
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

const Write = () => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('서울');
    const [nickname, setNickname] = useState('');
    const [images, setImages] = useState([]);

    const onChangeImage = (e) => {
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

    // useEffect(() => {
    //     console.log(userId, pw, region, nickname);
    // }
    // , [userId, pw, region, nickname]);

//     const Write = () => {
//         axios.post('http://localhost:8080/api/article', {
//             userId: "",
//             title: title,
//             content: content,
//             price: Number(price),
//             imgUrls: images,
//         },
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//     }

    return (
        <div style={{width: 1200, float: "left", left: "50%", transform: "translateX(-50%)"}}>
            <WriteFrm>
                <p>글 작성하기</p>
                <Item>
                    <p>제목</p>
                    <div>
                        <input placeholder="제목을 입력해주세요." onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <p>가격</p>
                    <div>
                        <input placeholder="\ 0" type="number" onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                </Item>
                <Item>
                    <p>설명</p>
                    <div>
                        <textarea placeholder="설명을 입력해주세요." onChange={(e) => setContent(e.target.value)} required></textarea>
                    </div>
                </Item>
                <Item>
                    <p>사진</p>
                    <div>
                        <input type="file" multiple accept="image/*" onChange={onChangeImage} />
                    </div>
                </Item>
                <Item>
                    <Btn onClick={() => Write()}>등록하기</Btn>
                </Item>
            </WriteFrm>
        </div>
    );
}

export default Write;