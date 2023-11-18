import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Search from "../components/search";
import MainItem from "../components/mainItem";
import axios from 'axios'
import Header from "../components/header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const WriteBtn = styled.button`
    width: 150px;
    height: 40px;
    background: #1DA1F2;
    color: white;
    border: none;
    border-radius: 5px;
    float: right;
    margin-top: 30px;
    font-size: 16px;
    & > a {
        color: white;
    }
`;

const ItemContainer = styled.div`
    width: 100%;
    float: left;
`;

const Index = () => {
    const [articleData, setArticleData] = useState([]);
    const [region, setRegion] = useState("default");

    // 데이터를 불러오는 부분
    useEffect(() => {
      const fetchData = async () => {
        try {
            
            if(region == "default"){
                const response = await axios.get(`http://localhost:8080/api/articles/recent`);
                const data = response.data.map((item) => ({
                    articleId: item.articleId,
                    title: item.title,
                    price: item.price,
                    userNickname: item.userNickname,
                    imgLinkUrl: item.imgLinkUrl
                  }));
          
                setArticleData(response.data); // 데이터를 articleData state에 설정
            }else{
                const response = await axios.get(`http://localhost:8080/api/articles/recent/${region}`);
                const data = response.data.map((item) => ({
                    articleId: item.articleId,
                    title: item.title,
                    price: item.price,
                    userNickname: item.userNickname,
                    imgLinkUrl: item.imgLinkUrl
                  }));
          
                setArticleData(response.data); // 데이터를 articleData state에 설정
            }
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      // fetchData 함수 호출
      fetchData();
    }, []);

    return (
        <div style={{width: 1200, float: "left", left: "50%", transform: "translateX(-50%)"}}>
            <Search />
            <div style={{width: 1200, float: "left"}}>
                <WriteBtn><Link to="/write">게시글 작성</Link></WriteBtn>
            </div>
            <ItemContainer>
                {/* <MainItem src={"image1.png"} title={"키엘 핸드크림 팝니다"} price={20000} name={"Kiehls"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} />
                <MainItem src={"image2.png"} title={"이솝 핸드크림 새상품"} price={14000} name={"규리규리"} /> */}
            {articleData.map((data) => (
                <MainItem
                    key={data.articleId}
                    articleId={data.articleId}
                    title={data.title}
                    price={data.price}
                    userNickname={data.userNickname}
                    imgLinkUrl={data.imgLinkUrl}
                />
            ))}
            </ItemContainer>
        </div>
    );
}

export default Index;