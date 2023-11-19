import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import MainItem from "../components/mainItem";
import axios from 'axios';

const List = styled.div`
    width: 100%;
    float: left;
    padding: 30px;
    border-bottom: 1px solid #ddd;

    & > div a > img {
        height: 200px;
    }
`;

const Articles = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user ? "/"+user.userId : "";
    
    const [heartArticles, setHeartArticles] = useState([]);
    const [sellArticles, setSellArticles] = useState([]);
    const [historySellArticles, setHistorySellArticles] = useState([]);
    const [historyPurchaseArticles, setHistoryPurchaseArticles] = useState([]);
    const [purchaseArticles, setPurchaseArticles] = useState([]);

    useEffect(() => {
        // 관심 내역 조회
        axios.get(`/api/article/heart${userId}`).then((response) => {
            setHeartArticles(response.data);
        });
        // 판매 진행 내역 조회
        axios.get(`/api/article/sell${userId}`).then((response) => {
            setSellArticles(response.data);
        });
        // 판매 완료 내역 조회
        axios.get(`/api/article/history/sell${userId}`).then((response) => {
            setHistorySellArticles(response.data);
        });
        // 구매 신청 내역 조회
        axios.get(`/api/article/purchase${userId}`).then((response) => {
            setPurchaseArticles(response.data);
        });
        // 구매 완료 내역 조회
        axios.get(`/api/article/history/purchase${userId}`).then((response) => {
            setHistoryPurchaseArticles(response.data);
        });
    }, []);

    return (
        <div style={{width: "80%", float: "left", borderLeft: "1px solid #ddd"}}>
            <div style={{width: "100%", float: "left"}}>
                <div style={{width: "100%", float: "left", borderBottom: "1px solid #ddd"}}>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>관심 내역</p>
                        {heartArticles.map((data) => (
                            <MainItem
                                articleId={data.articleId}
                                title={data.title}
                                price={data.price}
                                userNickname={data.userNickname}
                                imgLinkUrl={data.imgLinkUrl}
                            />
                        ))}
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>판매 진행 내역</p>
                        {sellArticles.map((data) => (
                            <MainItem
                                articleId={data.articleId}
                                title={data.title}
                                price={data.price}
                                userNickname={data.userNickname}
                                imgLinkUrl={data.imgLinkUrl}
                            />
                        ))}
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>판매 완료 내역</p>
                        {historySellArticles.map((data) => (
                            <MainItem
                                articleId={data.articleId}
                                title={data.title}
                                price={data.price}
                                userNickname={data.userNickname}
                                imgLinkUrl={data.imgLinkUrl}
                            />
                        ))}
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>구매 신청 내역</p>
                        {purchaseArticles.map((data) => (
                            <MainItem
                                articleId={data.articleId}
                                title={data.title}
                                price={data.price}
                                userNickname={data.userNickname}
                                imgLinkUrl={data.imgLinkUrl}
                            />
                        ))}
                    </List>
                    <List>
                        <p style={{fontSize: 20, fontWeight: "bold"}}>구매 완료 내역</p>
                        {historyPurchaseArticles.map((data) => (
                            <MainItem
                                articleId={data.articleId}
                                title={data.title}
                                price={data.price}
                                userNickname={data.userNickname}
                                imgLinkUrl={data.imgLinkUrl}
                            />
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default Articles;