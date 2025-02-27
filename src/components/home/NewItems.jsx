import axios from "axios";
import React, { useEffect, useState } from "react";
import { NewItemsCarousel, NewItemsCarouselSkeleton } from "./components/NewItemsCarousel";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setNewItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in" data-aos-easing="ease-out">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <NewItemsCarouselSkeleton />
          ) : (
            <NewItemsCarousel items={newItems} />
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
