import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownTimer } from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [allItems, setAllItems] = useState([]);
  const [itemCount, setItemCount] = useState(allItems.length);
  const [displayLimit, setDisplayLimit] = useState();
  const [subset, setSubset] = useState(allItems.slice(0, displayLimit));
  const [displayingAll, setDisplayingAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchItems = async (filter = "") => {
    setLoading(true);
    let apiURL =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filter) {
      apiURL += `?filter=${filter}`;
    }
    const { data } = await axios.get(apiURL);
    setAllItems(data);
    setItemCount(data.length);
    setSubset(data.slice(0, displayLimit));
    setLoading(false);
  };

  useEffect(() => {
    setDisplayLimit(8);
    fetchItems();
  }, []);

  useEffect(() => {
    if (allItems.length > 0) {
      const newSubset = allItems.slice(0, Math.min(itemCount, displayLimit));
      setSubset(newSubset);
      setDisplayingAll(displayLimit >= itemCount);
    }
  }, [allItems, displayLimit, itemCount]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => fetchItems(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton
                className="nft__item"
                width="100%"
                height="400px"
                borderRadius="0px"
              />
            </div>
          ))
        : subset.map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <CountdownTimer expiration={item.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {!displayingAll && (
        <div
          className="col-md-12 text-center"
          onClick={() => setDisplayLimit((prevLimit) => prevLimit + 4)}
        >
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
