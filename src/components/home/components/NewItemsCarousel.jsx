import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../../css/styles/style.css";
import { Link } from "react-router-dom";
import { CountdownTimer } from "../../UI/CountdownTimer";

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
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <div className="nft__item_price">{items.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{items.likes}</span>
                  </div>
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
                <div className="author_list_pp items-img__skeleton skeleton-box">
                  <div className="items-author__container">
                    <div
                      className="lazy items-author__img--skeleton skeleton-box"
                      src=""
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </div>
                </div>

                <div className="nft__item_wrap item-wrap__skeleton--invisible">
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

                  <Link to="/item-details">
                    <img src="" className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info items-info__container">
                  <Link to="/item-details">
                    <div className="items-title__skeleton skeleton-box" />
                  </Link>
                  <div className="nft__item_price items-price__skeleton skeleton-box" />
                  <div className="nft__item_like items-like__skeleton skeleton-box">
                    <i className="fa fa-heart"></i>
                    <span></span>
                  </div>
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
