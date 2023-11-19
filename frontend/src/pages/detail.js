import React, {useState} from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import Modal from 'react-modal';
import axios from "axios";

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

const SellBtn = styled.button`
    width: 100%;
    height: 40px;
    background: #1DA1F2;
    color: #fff;
    border: none;
`;

const List = styled.div`
    width: 100%;
    float: left;
    padding: 0 20px;

    & > div {
        width: 100%;
        float: left;
        margin-bottom: 5px;
        // border-bottom: solid 1px #ddd;
    }
    & > div > * {
        float: left;
        
    }
    & > div > button{
        float: right;
    }
`;

const customModalStyles = {
    overlay: {
        backgroundColor: " rgba(0, 0, 0, 0.4)",
        width: "100vw",
        height: "100vh",
        zIndex: "10",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0"
    },
    content: {
        width: "400px",
        height: "auto",
        position: "relative",
        zIndex: "150",
        inset: "50% 0 0 50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
        margin: 0
    },
};

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
    const params = useParams();
    const articleId = params.articleId;
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [articleData, setArticleData] = useState({});

    axios.get(`http://localhost:8080/api/articles/${articleId}`).then((response) => {
        setArticleData(response.data);
    }).catch((err) => {
        console.log(err);
    });

    // const images = [
    //     { url: publicUrl+"image2.png" },
    //     { url: publicUrl+"images/2.jpg" },
    //     { url: publicUrl+"images/3.jpg" },
    //     { url: publicUrl+"images/4.jpg" }
    // ];

    const [modalOpen, setModalOpen] = useState(false);
    const [sellModalOpen, setSellModalOpen] = useState(false);

    const PopupMessage = ({ message }) => {
        return (
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customModalStyles}
                ariaHideApp={false}
                contentLabel="Pop up Message"
                shouldCloseOnOverlayClick={false}
            >
                <div style={{width: "100%", float: "left", padding: 20, textAlign: "center"}}>
                    <p style={{fontSize: 22, fontWeight: 500, marginBottom: 10}}>{message}</p>
                    <p style={{marginBottom: 10}}>구매를 신청하겠습니까?</p>
                    <button style={{width: 100, height: 40, background: "#fff", color: "#1DA1F2", border: "solid 1px #1DA1F2"}} onClick={() => setModalOpen(false)}>취소</button>
                    <button style={{width: 100, height: 40, background: "#1DA1F2", color: "#fff", border: "none", marginLeft: 10}} onClick={() => setModalOpen(false)}>확인</button>
                </div>
            </Modal>
    )}

    const SellPopupMessage = ({ message }) => {
        return (
            <Modal
                isOpen={sellModalOpen}
                onRequestClose={() => setSellModalOpen(false)}
                style={customModalStyles}
                ariaHideApp={false}
                contentLabel="Pop up Message"
                shouldCloseOnOverlayClick={false}
            >
                <div style={{width: "100%", float: "left", padding: 20, textAlign: "center"}}>
                    <p style={{fontSize: 22, fontWeight: 500, marginBottom: 5}}>{message}</p>
                    <p style={{marginBottom: 20, fontSize: 18}}>구매자 확정</p>
                    <List>
                        <div>
                            <p>유저1</p>
                            <button style={{border: "solid 1px #1DA1F2", color:"#1DA1F2", background:"#fff"}}>확정</button>
                        </div>
                        {/* <div>
                            <p>유저1</p>
                            <button style={{border: "solid 1px #1DA1F2", color:"#1DA1F2", background:"#fff"}}>확정</button>
                        </div>
                        <div>
                            <p>유저1</p>
                            <button style={{border: "solid 1px #1DA1F2", color:"#1DA1F2", background:"#fff"}}>확정</button>
                        </div>
                        <div>
                            <p>유저1</p>
                            <button style={{border: "solid 1px #1DA1F2", color:"#1DA1F2", background:"#fff"}}>확정</button>
                        </div> */}
                    </List>
                    <button style={{width: 100, height: 40, background: "#1DA1F2", color: "#fff", border: "solid 1px #fff"}} onClick={() => setSellModalOpen(false)}>취소</button>
                </div>
            </Modal>
    )}

    const SellComponent = () => {
        return(
            <SellBtn onClick={() => setSellModalOpen(true)}>
                <span style={{float: "left", left: "50%", transform: "translateX(-50%)"}}>
                    <span className="material-symbols-outlined" style={{float: "left"}}>local_mall</span>
                    <span style={{float: "left"}}> 판매자 확정</span>
                </span>
            </SellBtn>
        )
    }

    return (
        <div style={{width: "100%", float: "left"}}>
            <PopupMessage message={articleData.title} />
            <SellPopupMessage message={articleData.title} />

            <div style={{width: 1000, float: "left", left: "50%", transform: "translateX(-50%)"}}>
                <p style={{fontSize: 25, fontWeight: 500, marginTop: 50, color: "#333"}}>상품 상세</p>
                <Container>
                    <div style={{width: "40%", float: "left", paddingLeft: 30}}>
                        <SimpleImageSlider
                            width={"100%"}
                            height={250}
                            images={articleData.imgUrls}
                            showBullets={true}
                            showNavs={true}
                        />
                    </div>
                    <div style={{width: "60%", float: "right", padding: "15px 30px"}}>
                        <p style={{width: "100%", float: "left", color: "#555", borderBottom: "1px solid #ddd", paddingBottom: 10}}>
                            <img 
                                src={publicUrl+articleData.sellerProfileImgUrl} 
                                alt="img" 
                                style={{width: 35, height: 35, borderRadius: "50%", float: "left", objectFit: "cover"}} 
                            />
                            {/* <span style={{float: "left"}} class="material-symbols-outlined">account_box</span> */}
                            <span style={{marginLeft: 10, float: "left", fontSize: 20, marginTop: 3}}><b style={{fontSize: 20}}>{articleData.sellerNickname}</b>님의 상품</span>
                        </p>
                        <p style={{fontSize: 23, fontWeight: 500, float: "left", marginTop:10}}>{articleData.title}</p>
                        <Info />

                        <p style={{fontSize: 30, fontWeight: 500,marginBottom: 10, float:"left"}}>{parseInt(articleData.price).toLocaleString()}\</p>

                        <div style={{width: "100%", float: "left"}}>
                            <LikeBtn>
                                <span style={{float: "left", left: "50%", transform: "translateX(-50%)"}}>
                                    <span className="material-symbols-outlined" style={{float: "left"}}>favorite</span>
                                    <span style={{float: "left"}}> 관심등록</span>
                                </span>
                            </LikeBtn>
                            {/* <SellComponent /> */}
                            <BuyBtn onClick={() => setModalOpen(true)}>
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