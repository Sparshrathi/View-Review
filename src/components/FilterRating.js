import React, { useContext } from "react";
import StarRatings from "react-star-ratings";
import Context from "../Context";

const FilterRating = () => {
  const { minRating, resetMinRating } = useContext(Context);
  const changeRating = (newRating) => {
    resetMinRating(newRating);
  };

  return (
    <div className="filter-rating">
      <span className="rating-text">Min Rating:</span>
      <StarRatings
        rating={minRating}
        starRatedColor="rgb(204, 139, 26)"
        starEmptyColor="rgb(203, 211, 227)"
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
        starDimension="30px"
      />
    </div>
  );
};

export default FilterRating;
