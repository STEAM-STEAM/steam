import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
    width: 100%;
    margin-top: 50px;
    height: 40px;
`;

const LocationSelector = styled.select`
    width: 200px;
    height: 100%;
    margin-right: 30px;
    color : #999;
`;

const PriceInput = styled.input`
    height: 100%;
    width: 200px;
`;

const SearchInput = styled.input`
    height: 100%;
    width: 400px;
    float: right;
    margin-right: 20px;

    & > option {
        color: red;
    }
`;

const SearchBtn = styled.button`
    height: 100%;
    width: 100px;
    color: #1DA1F2;
    background: white;
    float: right;
    border: 1px solid #1DA1F2;
    cursor: pointer;
    border-radius: 20px;
`;

const Search = () => {
    return (
        <Container>
            <LocationSelector >
                <option value="" disabled selected style={{display: "none"}}>
                    지역을 선택해주세요.
                </option>
                <option value="서울">서울</option>
                <option value="인천">인천</option>
                <option value="대전">대전</option>
                <option value="광주">광주</option>
                <option value="부산">부산</option>
                <option value="대구">대구</option>
                <option value="울산">울산</option>
            </LocationSelector>
            <PriceInput type="number" placeholder="최소 가격" />&nbsp;~&nbsp; 
            <PriceInput type="number" placeholder="최대 가격" />
            <SearchBtn>
                검색
            </SearchBtn>
            <SearchInput type="text" placeholder="검색어를 입력하세요." />
        </Container>
    )
}

export default Search;