import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [topAuthors, setTopAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopAuthors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading? (new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <div
                        className="lazy pp-author sellers-author__img--skeleton skeleton-box"
                        src={AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <div className="sellers-author__name--skeleton skeleton-box" />
                    <span className="sellers-price__skeleton skeleton-box" />
                  </div>
                </li>
              ))): (
                topAuthors.map((author) => (
                  <li key={author.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${author.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={author.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link className="seller-author__name" to={`/author/${author.authorId}`}>{author.authorName}</Link>
                      <span>{author.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
