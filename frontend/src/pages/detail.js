import React from "react";
import styled from "@emotion/styled";
import SimpleImageSlider from "react-simple-image-slider";

const Container = styled.div`
    width: 100%;
    float: left;
    border-top: solid 1px #111;
    margin-top: 10px;
    padding: 20px 0;

    & .rsis-image {
        background-position: center center;
    }
`;

const Icon = styled.span`
    font-size: 20px;
    margin-right: 5px;
    float: left;
`;

const Text = styled.span`
    float: left;
    margin-top: -2px;
`;

const BuyBtn = styled.button`
    width: calc((100% - 20px) / 2);
    height: 40px;
    background: #1DA1F2;
    color: #fff;
    border: none;
`;

const LikeBtn = styled.button`
    width: calc((100% - 20px) / 2);
    height: 40px;
    background: #fff;
    color: #D41536;
    border: 1px solid #D41536;
    margin-right: 20px;
`;

const publicUrl = process.env.PUBLIC_URL+"/assets/images/";

const Info = () => {
    return (
        <div style={{paddingBottom:10, width: "100%", float: "left",paddingTop: 5, fontSize: 14, color: "#999"}}>
            <div style={{float: "left", marginRight: 20}}>
                <Icon className="material-symbols-outlined">favorite</Icon>
                <Text>4</Text>
            </div>
            <div style={{float: "left", marginRight: 20}}>
                <Icon className="material-symbols-outlined">visibility</Icon>
                <Text>4</Text>
            </div>
            <div style={{float: "left", marginRight: 20}}>
                <Icon className="material-symbols-outlined">schedule</Icon>
                <Text>2023.11.16</Text>
            </div>
        </div>
    );
};

const CommentItem = () => {
    return(
        <div style={{width: "100%", float: "left", padding: 30, borderTop: "1px solid #ddd"}}>
            <div style={{width: "100%", float: "left"}}>
                <img 
                    src={`${publicUrl}user1.jpg`} 
                    alt="img" 
                    style={{width: 65, height: 65, borderRadius: "50%", float: "left", objectFit: "cover"}} 
                />
                <div style={{float: "left", marginLeft: 10}}>
                    <p style={{fontSize: 18, fontWeight: 500}}>경준</p>
                    <p style={{color: "#999"}}><Icon className="material-symbols-outlined">schedule</Icon>2021.11.16</p>
                </div>
            </div>
            <p style={{color: "#555", marginTop: 10, float: "left"}}>거래 장소는 어디로 생각하시나요!!!!!</p>
        </div>
    );
};

const Comment = () => {
    return(
        <div style={{float: "left", width: "100%", padding: "20px 30px"}}>
            <p style={{fontSize: 20, fontWeight: 500, marginBottom: 10}}>댓글</p>
            <textarea 
                placeholder="댓글을 입력해주세요." 
                style={{width: "100%", height: 100, padding: "10px 20px"}}
            >
            </textarea>
            <button style={{float: "right", height: 30, width: 100}}>등록하기</button>
        </div>
    );
};


const Detail = () => {

    const images = [
        { url: publicUrl+"image2.png" },
        { url: publicUrl+"images/2.jpg" },
        { url: publicUrl+"images/3.jpg" },
        { url: publicUrl+"images/4.jpg" },
        { url: publicUrl+"images/5.jpg" },
        { url: publicUrl+"images/6.jpg" },
        { url: publicUrl+"images/7.jpg" },
    ];

    return (
        <div style={{width: "100%", float: "left"}}>
            <div style={{width: 1000, float: "left", left: "50%", transform: "translateX(-50%)"}}>
                <p style={{fontSize: 25, fontWeight: 500, marginTop: 50, color: "#333"}}>상품 상세</p>
                <Container>
                    <div style={{width: "40%", float: "left", paddingLeft: 30}}>
                        <SimpleImageSlider
                            width={"100%"}
                            height={250}
                            images={images}
                            showBullets={true}
                            showNavs={true}
                        />
                    </div>
                    <div style={{width: "60%", float: "right", padding: "15px 30px"}}>
                        <p style={{width: "100%", float: "left", color: "#555", borderBottom: "1px solid #ddd", paddingBottom: 10}}>
                            <img 
                                src={`${publicUrl}user1.jpg`} 
                                alt="img" 
                                style={{width: 35, height: 35, borderRadius: "50%", float: "left", objectFit: "cover"}} 
                            />
                            {/* <span style={{float: "left"}} class="material-symbols-outlined">account_box</span> */}
                            <span style={{marginLeft: 10, float: "left", fontSize: 20, marginTop: 3}}><b style={{fontSize: 20}}>경준</b>님의 상품</span>
                        </p>
                        <p style={{fontSize: 23, fontWeight: 500, float: "left", marginTop:10}}>핸드크림 새상품 판매합니다.</p>
                        <Info />

                        <p style={{fontSize: 30, fontWeight: 500,marginBottom: 10, float:"left"}}>20,000\</p>

                        <div style={{width: "100%", float: "left"}}>
                            <LikeBtn>
                                <span style={{float: "left", left: "50%", transform: "translateX(-50%)"}}>
                                    <span className="material-symbols-outlined" style={{float: "left"}}>favorite</span>
                                    <span style={{float: "left"}}> 관심등록</span>
                                </span>
                            </LikeBtn>
                            <BuyBtn>
                                <span style={{float: "left", left: "50%", transform: "translateX(-50%)"}}>
                                    <span className="material-symbols-outlined" style={{float: "left"}}>local_mall</span>
                                    <span style={{float: "left"}}> 구매신청</span>
                                </span>
                            </BuyBtn>
                        </div>
                    </div>
                </Container>
                
                <div style={{float: "left", width: "100%", padding: "0 30px"}}>
                    <div style={{borderBottom: "1px solid #ddd", float: "left", width: "100%"}}></div>
                </div>

                <div style={{padding: 30, float: "left", borderBottom: "1px solid #111"}}>
                    <p style={{fontSize: 20, fontWeight: 500, marginBottom: 10}}>상품 상세 정보</p>
                    <p>
                    Aesop 크렘 드 파퓨메 No.01 르 블랑<br/>
                    (Aesop 크렘 드 파퓨메 1호 르 블랑 50ml + Aesop 사봉 드 파퓨메 1호 르 블랑 65g수분포함 / 45g건조시 + Aesop 크렘 드 파퓨메 트레이 1ea)<br/>
                    💛포장 뜯지 않은 새 상품이며 박스상태는 사진 참고해주세요
                    </p>
                </div>
                <Comment />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </div>
        </div>
    );
}

export default Detail;