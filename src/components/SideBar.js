import React, { useContext } from "react";
import Context from "../Context";
import RestaurantCard from "./RestaurantCard";
import shortid from "shortid";


const SideBar = () => {
  const { restaurants, minRating } = useContext(Context);

  return (
    <div className="sidebar">
      {restaurants.map((restu) => {

        if (restu.rating < minRating || !restu.rating) {
          return null;
        } 
        else {
          return (

            <RestaurantCard
              key={shortid.generate()}
              name={restu.name}
              imageSource={restu.photos}
              rating={restu.rating}
              placeid={restu.place_id}
              lat={restu.geometry.location.lat}
              lng={restu.geometry.location.lng}
              
            />
          );
        }
      })}
    </div>
  );
};

export default SideBar;
