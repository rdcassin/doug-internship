import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../../css/styles/style.css";
import { Link } from "react-router-dom";
import { CountdownTimer } from "../../UI/CountdownTimer";
import Skeleton from "../../UI/Skeleton";

export const NewItemsCarousel = ({ items }) => {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    created() {
      setLoaded(true);
    },
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 2 },
      },
      "(min-width: 900px)": {
        slides: { perView: 3 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4 },
      },
    },
  });

  const Arrow = (props) => {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow items-arrow ${
          props.left ? "arrow--left" : "arrow--right"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  };

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {items.map((items) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
              key={items.id}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${items.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={items.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <CountdownTimer expiration={items.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="/">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${items.nftId}`}>
                    <img
                      src={items.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${items.nftId}`}>
                    <h4>{items.title}</h4>
                  </Link>
                  <div className="nft__item_price">{items.price} ETH</div>
                </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{items.likes}</span>
                  </div>
              </div>
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />
          </>
        )}
      </div>
    </>
  );
};

export const NewItemsCarouselSkeleton = () => {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    created() {
      setLoaded(true);
    },
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 2 },
      },
      "(min-width: 900px)": {
        slides: { perView: 3 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4 },
      },
    },
  });

  const Arrow = (props) => {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow items-arrow ${
          props.left ? "arrow--left" : "arrow--right"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  };

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {new Array(6).fill(0).map((_, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
              key={index}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="items-author__container">
                    <Skeleton
                      className="lazy"
                      width="50px"
                      height="50px"
                      borderRadius="50px"
                    />
                    <i className="fa fa-check"></i>
                  </div>
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra"></div>

                  <Link to="">
                    <Skeleton
                      className="lazy nft__item_preview"
                      width="100%"
                      height="350px"
                      borderRadius="0px"
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <Skeleton width="180px" height="30px" borderRadius="0px" />
                  </Link>
                  <Skeleton
                    className="nft__item_price"
                    width="100px"
                    height="20px"
                    borderRadius="0px"
                  />
                </div>
                  <div className="nft__item_like">
                  <Skeleton
                    width="30px"
                    height="15px"
                    borderRadius="0px"
                  />
                  </div>
              </div>
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />
          </>
        )}
      </div>
    </>
  );
};
