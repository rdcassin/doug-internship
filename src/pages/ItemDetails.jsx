import axios from "axios";
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [nftDetails, setNftDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const { nftId } = useParams();

  const fetchNftData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setNftDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNftData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      width="100%"
                      height="100%"
                      borderRadius="0px"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="300px" height="40px" borderRadius="0px" />
                      <div className="item_info_counts">
                        <Skeleton className="item_info_views" width="80px" height="30px" borderRadius="0px" />
                        <div className="item_info_like" width="80px" height="30px" borderRadius="0px" />
                      </div>
                      <Skeleton width="100%" height="80px" borderRadius="0px" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton width="50px" height="50px" borderRadius="100%" />
                            </div>
                            <div className="author_list_info">
                            <Skeleton width="125px" height="20px" borderRadius="0px" />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                            <Skeleton width="50px" height="50px" borderRadius="100%" />
                            </div>
                            <div className="author_list_info">
                            <Skeleton width="125px" height="20px" borderRadius="0px" />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                        <Skeleton width="75px" height="20px" borderRadius="0px" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={nftDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{nftDetails.title} #{nftDetails.tag}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftDetails.likes}
                        </div>
                      </div>
                      <p>
                        {nftDetails.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nftDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftDetails.ownerId}`}>{nftDetails.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nftDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftDetails.creatorId}`}>{nftDetails.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
