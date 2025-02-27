import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import {
  AuthorItems,
  AuthorItemsSkeleton,
} from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import {
  AuthorProfile,
  AuthorProfileSkeleton,
} from "../components/author/AuthorProfile";

const Author = () => {
  const [authorDetails, setAuthorDetails] = useState([]);
  const [nftPortfolio, setNftPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorDetails(data);
    setNftPortfolio(data.nftCollection);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <AuthorProfileSkeleton />
                ) : (
                  <AuthorProfile authorInfo={authorDetails} />
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {loading ? (
                    <AuthorItemsSkeleton />
                  ) : (
                    <AuthorItems
                      nftData={nftPortfolio}
                      authorPicture={authorDetails.authorImage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
