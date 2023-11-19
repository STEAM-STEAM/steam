import React,{useState} from "react";
import styled from "@emotion/styled";
import Select from 'react-select'
import { Link } from "react-router-dom";
import axios from 'axios'

const Container = styled.div`
    width: 100%;
    margin-top: 50px;
    height: 40px;
`;

const LocationSelector = styled.div`
    width: 200px;
    float: left;
    height: 100%;
    margin-right: 30px;
    color : #999;
`;

const PriceInput = styled.input`
    height: 100%;
    width: 200px;
    float: left;
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

const options = [
    { value: '서울', label: '서울' },
    { value: '인천', label: '인천' },
    { value: '대전', label: '대전' },
    { value: '광주', label: '광주' },
    { value: '부산', label: '부산' },
    { value: '대구', label: '대구' },
    { value: '울산', label: '울산' }
];

// 검색 컴포넌트
const Search = ({ onDataChange }) => {
    const [region, setRegion] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [searchWord, setSearchWord] = useState('');

    // 검색 버튼을 눌렀을 때
    const search = () => {

        if(minPrice > maxPrice){
            alert("최소 가격이 최대 가격보다 큽니다.");
            return;
        }

        if (minPrice < 0 || maxPrice < 0) {
            alert("가격은 0원 이상이어야 합니다.");
            return;
        }

        if (region === '') setRegion("null");
        if (searchWord === '') setSearchWord("null");
        
        axios.get(`http://localhost:8080/api/article/search?region=${region}&keyword=${searchWord}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
        .then((res) => {
            console.log(res.data);
            onDataChange(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Container>
            <LocationSelector >
                <Select 
                    id="searchRegion"
                    options={options} 
                    placeholder="활동지역" 
                    onChange={(e) => setRegion(e.value)}
                    value={options.filter((val) => {
                        return val.value === region;
                    })}
                    required 
                />
            </LocationSelector>
            <PriceInput 
                type="number" 
                placeholder="최소 가격"
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <span style={{float:"left", lineHeight: "35px"}}> &nbsp;~&nbsp;</span> 
            <PriceInput
                type="number" 
                placeholder="최대 가격"
                onChange={(e) => setMaxPrice(e.target.value)} 
            />
            <SearchBtn onClick={()=> search()}>
                검색
            </SearchBtn>
            <SearchInput 
                type="text" 
                placeholder="검색어를 입력하세요."
                onChange={(e) => setSearchWord(e.target.value)}
            />
        </Container>
    )
}

export default Search;