import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import axios from 'axios'
import { Link } from "react-router-dom";

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
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('서울');
    const [images, setImages] = useState([]);

    const onChangeImage = (e) => {
        const files = e.target.files;
        if (files == null) {
            return;
        }
        setImages(files);
    };

    const write = () => {
        const formData = new FormData();
        formData.append("userId", user.userId);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("price", price);


        let imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            // imageUrls.push(images[i]);
            formData.append("image", images[i]);
        }

        // formData.append("image", imageUrls);

        console.log(formData.get("image"))

        let entries = formData.entries();
        for (const pair of entries) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }


        axios.post('http://localhost:8080/api/article', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            if (response.data.message == "success") {
                alert("게시글이 등록되었습니다.");
                window.location.replace("/");
            } else {
                alert("게시글 등록에 실패하였습니다.");
            }
        }).catch((err) => {
            console.log(err);
        });

        // axios.post('http://localhost:8080/api/article', {
        //     userId: user.userId,
        //     title: title,
        //     content: content,
        //     price: price,
        //     imgUrls: images,
        // }).then((response) => {
        //     if (response.data.message == "success") {
        //         alert("게시글이 등록되었습니다.");
        //     } else {
        //         alert("게시글 등록에 실패하였습니다.");
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // });
    }

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
                    <Btn type="button" onClick={write}>등록하기</Btn>
                </Item>
            </WriteFrm>
        </div>
    );
}

export default Write;