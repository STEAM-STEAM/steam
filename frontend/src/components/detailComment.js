import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import Modal from 'react-modal';
import axios from "axios";

const Comment = ({articleId}) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [content, setContent] = useState("");

    const comment = () => {
        if (content == "") {
            alert("댓글을 입력해주세요.");
            return;
        }

        axios.post(`http://localhost:8080/api/comment`, {
            content: content,
            articleId: articleId,
            userId: user.userId
        }).then((response) => {
            console.log(response);
            if (response.data == "OK") {
                console.log(response.data);
                alert("댓글이 등록되었습니다.");
                window.location.reload();
            } else {
                alert("댓글 등록에 실패하였습니다.");
            }
        });
    }

    return(
        <div style={{float: "left", width: "100%", padding: "20px 30px"}}>
            <p style={{fontSize: 20, fontWeight: 500, marginBottom: 10}}>댓글</p>
            <textarea 
                placeholder="댓글을 입력해주세요." 
                style={{width: "100%", height: 100, padding: "10px 20px"}}
                onChange={(e) => setContent(e.target.value)}
            >
            </textarea>
            <button 
                style={{float: "right", height: 30, width: 100}}
                onClick={comment}
            >
                등록하기
            </button>
        </div>
    );
};

export default Comment;