import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import MainItem from "../components/mainItem";
import Modal from 'react-modal';
import axios from "axios";

const Tag = styled.span`
    font-size: 14px;
    margin-right: 10px;
    color: #1DA1F2;
`;

const Keyword = () => {
    const [keywordData, setKeywordData] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/keyword/${user.userId}`).then((response) => {
            const data = response.data.keywords;
            setKeywordData(data);
        });
    }, []);

    const deleteKeyword = (keyword) => {
        axios.delete(`http://localhost:8080/api/user/keyword/${user.userId}/${keyword}`).then((response) => {
            if (response.data.message == "success") {
                alert("키워드가 삭제되었습니다.");
                window.location.reload();
            } else {
                alert("키워드 삭제에 실패하였습니다.");
            }
        });
    }

    return (
        keywordData.map((data) => (
            <Tag>
                {data}
                <span 
                    onClick={() => deleteKeyword(data)}
                    style={{cursor: "pointer"}}
                > x
                </span>
            </Tag>
        ))
    );
}

export default Keyword;