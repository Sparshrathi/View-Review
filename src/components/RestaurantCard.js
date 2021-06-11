import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Rating from "@material-ui/lab/Rating";
import Popup from "reactjs-popup";
import axios from "axios";
import IndividualReview from "./IndividualReview";
import ReactStreetview from 'react-streetview';


const RestaurantCard = ({ name, imageSource, rating, placeid ,lat,lng}) => {
  const [reviewResponse, setReviewResponse] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [restImage, setRestImage] = useState("");
  let reviewDetails = [];

  console.log("hello"+lat);

  
  const googleMapsApiKey = 'KEYAIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0';
  const streetViewPanoramaOptions = {
      position: {lat:lat, lng:lng},
     // position: {lat: 46.9171876, lng: 17.8951832},

      pov: {heading: 100, pitch: 0},
      zoom: 1

  };


  const reviewFetch = async () => {
    if (placeid != null) {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeid}&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`;
      const request = await axios.get(url).catch((error) => {
        console.log("erre", error);
      });

      const response = request;

      if (response && response.status !== 200) {
      }
      if (response) {
        if (response.data.result.photos != null) {
          setRestImage(response.data.result.photos[0].photo_reference);
          setReviewResponse(response.data.result.reviews);
        }
      }
    } else {
      setReviewResponse([]);
    }
  };
  useEffect(() => {
    reviewFetch();
  }, []);

  const handleReviewSubmit = (e,reviewName,setReviewName,reviewRating,setReviewRating,reviewText) => {
    e.preventDefault();

    if (reviewName !== "" && reviewText !== "" && reviewRating !== 0) {
      reviewDetails = {
        author_name: reviewName,
        rating: parseInt(reviewRating),
        text: reviewText,
        profile_photo_url:
          "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      };

      setReviewName("");
      setReviewText("");
      setReviewRating("");
      setReviewResponse([...reviewResponse, reviewDetails]);
    }
  };

  return (
    <div className="card">
      <img
        src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${restImage}&sensor=false&maxheight=500&maxwidth=500&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`}
        alt="restaurant "
        className="restaurant-image"
      />
      <div className="container ">
        <h4 className="restaurant-title">{name}</h4>
        <StarRatings
          rating={rating}
          starRatedColor="rgb(204, 139, 26)"
          starDimension="30px"
        />
        <h2>
        <Popup
        trigger={
          <button  className="btn btn-primary btn-lg">Street View</button>
        }
        modal
        >
        
            {(close) => (
              <div className="streetarea">
                <a className="close" onClick={close}>
                  &times;
                </a>
                <div className="header">
                  <div style={{
                width: '500px',
                height: '450px',
                backgroundColor: '#eeeeee'
            }}>
                {/* <Street lat={lat} lng={lng} /> */}
                <div style={{
                width: '800px',
                height: '450px',
                backgroundColor: '#eeeeee'
            }}>
                <ReactStreetview
                    apiKey={googleMapsApiKey}
                    streetViewPanoramaOptions={streetViewPanoramaOptions}
                />
            </div>
            </div>
                  
              </div>
              </div>
            )}
          </Popup>
  



          <Popup
            trigger={
              
              <button className="btn btn-lg btn-primary" onClick={reviewFetch}>
                {" "}
                review{" "}
              </button>
            }
            modal
          >
            {(close) => (
              <div className="reviewarea">
                <a className="close" onClick={close}>
                  &times;
                </a>
                <div className="header bg-light">
                  {" "}
                  {name}
                  <Popup
                    trigger={<button className="btn btn-lg btn-outline-primary"> Add Review </button>}
                  >
                    <form
                      style={{ width: "auto" }}
                      onSubmit={(e) =>
                        handleReviewSubmit(
                          e,
                          reviewName,
                          setReviewName,
                          reviewRating,
                          setReviewRating,
                          reviewText
                        )
                      }
                    >
                      Name:
                      <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                      />
                      <br />
                      Comment:
                      <input
                        type="text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                      <br />
                      Rating:
                      <Rating
                        name="simple-controlled"
                        value={reviewRating}
                        onChange={(event, newValue) => {
                          if (newValue != null) {
                            setReviewRating(parseInt(newValue));
                          }
                        }}
                      />
                      <br />
                      <button className="btn btn-lg btn-outline-primary">submit</button>
                    </form>
                  </Popup>
                </div>
                <div>
                  {reviewResponse.map((restu) => {
                    return (
                      <div>
                        <IndividualReview
                          photo={restu.profile_photo_url}
                          name={restu.author_name}
                          rating={restu.rating}
                          text={restu.text}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Popup>
        </h2>
      </div>
    </div>
  );
};

export default RestaurantCard;