import axios from "axios";
import React, { useEffect, useState } from "react";
import { HotCollectionsCarousel, HotCollectionsCarouselSkeleton } from "./components/HotCollectionsCarousel";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollection = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in" data-aos-easing="ease-out">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <HotCollectionsCarouselSkeleton />
          ) : (
            <HotCollectionsCarousel collections={collections} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
