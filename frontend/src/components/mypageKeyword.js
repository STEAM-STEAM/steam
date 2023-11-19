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

    return (
        keywordData.map((data) => (
            <Tag>{data}</Tag>
        ))
    );
}

export default Keyword;