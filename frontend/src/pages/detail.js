import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import Modal from 'react-modal';
import axios from "axios";
import Comment from "../components/detailComment";

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
    &.like {
        background: #D41536;
        color: #fff;
        border: 1px solid #D41536;
    
    }
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

const Info = ({ data }) => {
    return (
        <div style={{paddingBottom:10, width: "100%", float: "left",paddingTop: 5, fontSize: 14, color: "#999"}}>
            <div style={{float: "left", marginRight: 20}}>
                <Icon className="material-symbols-outlined">favorite</Icon>
                <Text>{data.heartCount}</Text>
            </div>
            <div style={{float: "left", marginRight: 20}}>
                <Icon className="material-symbols-outlined">visibility</Icon>
                <Text>0</Text>
            </div>
            <div style={{float: "left", marginRight: 20}}>
                <Icon className="material-symbols-outlined">schedule</Icon>
                <Text>{data.createdTime}</Text>
            </div>
        </div>
    );
};

const CommentItem = ({data}) => {
    const publicUrl = process.env.PUBLIC_URL+"/assets/images/";

    return(
        <div style={{width: "100%", float: "left", padding: 30, borderTop: "1px solid #ddd"}}>
            <div style={{width: "100%", float: "left"}}>
                <img 
                    src={`${publicUrl+data.userProfileImgUrl}user1.jpg`} 
                    alt="img" 
                    style={{width: 65, height: 65, borderRadius: "50%", float: "left", objectFit: "cover"}} 
                />
                <div style={{float: "left", marginLeft: 10}}>
                    <p style={{fontSize: 18, fontWeight: 500}}>{data.userNickname}</p>
                    <p style={{color: "#999"}}><Icon className="material-symbols-outlined">schedule</Icon>{data.createTime}</p>
                </div>
            </div>
            <p style={{color: "#555", marginTop: 10, float: "left"}}>{data.content}</p>
        </div>
    );
};

const Detail = () => {
    const params = useParams();
    const articleId = params.articleId;
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [articleData, setArticleData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const [like, setLike] = useState(false);
    const [purchase, setPurchase] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/article/${articleId}`).then((response) => {
            console.log(response.data);
            setArticleData(response.data);
        }).catch((err) => {
            console.log(err);
        });

        axios.get(`http://localhost:8080/api/comment/${articleId}`).then((response) => {
            console.log(response.data);
            setCommentData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [like]);

    const SetLike = () => {
        axios.post(`http://localhost:8080/api/article/heart`, {
            userId: user.userId,
            articleId: articleId
        }).then((response) => {
            if (response.data == "increment") {
                setLike(true);
            } else if (response.data == "decrement") {
                setLike(false);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const purchaseRequest = () => {
        axios.post(`http://localhost:8080/api/article/purchase/request`, {
            userId: user.userId,
            articleId: articleId
        }).then((response) => {
            console.log(response, response.data);
            if (response.data == "purchase request success") {
                setPurchase(true);
                alert("구매신청이 완료되었습니다.");
            } else {
                setPurchase(false);
                alert("구매신청을 취소하였습니다.");
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const purchaseConfirm = () => {
        axios.post(`http://localhost:8080/api/article/purchase/confirm`, {
            userId: user.userId,
            articleId: articleId
        }).then((response) => {
            console.log(response, response.data);
            if (response.data == "success") {
                alert("구매자를 확정하였습니다.");
                window.location.replace("/");
            } else {
                alert("구매자 확정을 실패하였습니다.");
            }
        }).catch((err) => {
            console.log(err);
        });
    };
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
                    <p style={{marginBottom: 10}}>구매를 {(purchase == false) ? "신청" : "취소"}하겠습니까?</p>
                    <button style={{width: 100, height: 40, background: "#fff", color: "#1DA1F2", border: "solid 1px #1DA1F2"}} onClick={() => setModalOpen(false)}>취소</button>
                    <button style={{width: 100, height: 40, background: "#1DA1F2", color: "#fff", border: "none", marginLeft: 10}} 
                        onClick={() => {
                            setModalOpen(false);
                            purchaseRequest();
                            }
                        }>
                        확인
                    </button>
                </div>
            </Modal>
    )}

    const SellPopupMessage = ({ message }) => {
        const [purchaseUserList, setPurchaseUserList] = useState([]);
        useEffect(() => {
            axios.get(`http://localhost:8080/api/article/purchase/request/${articleId}`).then((response) => {
                console.log(response.data);
                setPurchaseUserList(response.data);
    
            }).catch((err) => {
                console.log(err);
            });
        }, []);

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
                        {
                            purchaseUserList.map((data) => (
                                <div>
                                    <p>{data.userNickname}</p>
                                    <button 
                                        onClick={purchaseConfirm}
                                        style={{border: "solid 1px #1DA1F2", color:"#1DA1F2", background:"#fff"}
                                    }>확정</button>
                                </div>
                            ))
                        }
                    </List>
                    <button style={{width: 100, height: 40, background: "#1DA1F2", color: "#fff", border: "solid 1px #fff"}} onClick={() => setSellModalOpen(false)}>취소</button>
                </div>
            </Modal>
    )}

    return (
        <div style={{width: "100%", float: "left"}}>
            <PopupMessage message={articleData.title} />
            <SellPopupMessage message={articleData.title} />

            <div style={{width: 1000, float: "left", left: "50%", transform: "translateX(-50%)"}}>
                <p style={{fontSize: 25, fontWeight: 500, marginTop: 50, color: "#333"}}>상품 상세</p>
                <Container>
                    <div style={{width: "40%", float: "left", paddingLeft: 30}}>
                        {/* <SimpleImageSlider
                            width={"100%"}
                            height={250}
                            images={imgLinkUrls}
                            showBullets={true}
                            showNavs={true}
                        /> */}
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
                        <Info data={articleData} />

                        <p style={{fontSize: 30, fontWeight: 500,marginBottom: 10, float:"left"}}>{parseInt(articleData.price).toLocaleString()}\</p>

                        <div style={{width: "100%", float: "left"}}>
                            {
                                user && user.userId != articleData.sellerId &&
                                    <LikeBtn onClick={SetLike} className={(like == true)? "like" : "noLike"} >
                                        <span style={{float: "left", left: "50%", transform: "translateX(-50%)"}}>
                                            <span className="material-symbols-outlined" style={{float: "left"}}>favorite</span>
                                            <span style={{float: "left"}}> {(like == false) ? "관심등록" : "관심해제"}</span>
                                        </span>
                                    </LikeBtn>
                            }
                            {
                                user && user.userId != articleData.sellerId &&
                                    <BuyBtn onClick={() => setModalOpen(true)}>
                                        <span style={{float: "left", left: "50%", transform: "translateX(-50%)"}}>
                                            <span className="material-symbols-outlined" style={{float: "left"}}>local_mall</span>
                                            <span style={{float: "left"}}> 구매 {(purchase == false) ? "신청" : "취소"}</span>
                                        </span>
                                    </BuyBtn>
                            }
                            {
                                user && user.userId == articleData.sellerId &&
                                    <SellBtn onClick={() => setSellModalOpen(true)}>
                                        <span style={{float: "left", left: "50%", transform: "translateX(-50%)"}}>
                                            <span className="material-symbols-outlined" style={{float: "left"}}>local_mall</span>
                                            <span style={{float: "left"}}> 판매자 확정</span>
                                        </span>
                                    </SellBtn>
                            }
                        </div>
                    </div>
                </Container>
                
                <div style={{float: "left", width: "100%", padding: "0 30px"}}>
                    <div style={{borderBottom: "1px solid #ddd", float: "left", width: "100%"}}></div>
                </div>

                <div style={{padding: 30, float: "left", borderBottom: "1px solid #111", width: "100%"}}>
                    <p style={{fontSize: 20, fontWeight: 500, marginBottom: 10}}>상품 상세 정보</p>
                    <p>
                        {articleData.content}
                    </p>
                </div>
                <Comment articleId={articleId} />
                {
                    commentData.map((data) => (
                        <CommentItem data={data} />
                    ))
                }
            </div>
        </div>
    );
}

export default Detail;
