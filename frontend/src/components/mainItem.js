import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Item = styled.div`
    width: calc((100% - 60px) / 4);
    height: 450px;
    border-radius: 5px;
    float: left;
    margin-top: 20px;
    margin-right: 20px;

    &:nth-of-type(4n) {
        margin-right: 0;
    }

    & > a > img {
        width: 100%;
        height: 350px;
        object-fit: cover;
    }

    & > a > div > p:first-of-type {
        color: #777;
        margin-top: 5px;
        font-size: 14px;
    }
    & > a > div > p:nth-of-type(2) {
        font-size: 18px;
        color: #111;

    }
    & > a > div > p:last-of-type {
        color: #111;
        font-size: 18px;
        font-weight: bold;
    }
`;

const MainItem = ({ src, title, price, name }) => {
    const publicUrl = process.env.PUBLIC_URL;

    return (
        <Item>
            <Link to="/detail">
                <img src={`${publicUrl}/assets/images/${src}`} alt="img" />
                <div>
                    <p><FontAwesomeIcon icon={faUser} /> {name}</p>
                    <p>{title}</p>
                    <p>{parseInt(price).toLocaleString()}원</p>
                </div>
            </Link>
        </Item>
    );
}

export default MainItem;