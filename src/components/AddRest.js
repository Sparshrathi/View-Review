import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import Rating from '@material-ui/lab/Rating';
import '../styles/style.css'


const AddRest = () => {
    const { restaurants, setAddRestFlag, setRestaurants, tempCoords } = useContext(Context);
    const [restName, setRestName] = useState('')
    const [restRating, setRestRating] = useState(0)
    let restDetails = []

    useEffect(() => {
        console.log("AddRest")
        setAddRestFlag(true)
    }, [])

    
    const handleSubmit = (e, restName, restRating) => {
        e.preventDefault()
        restDetails = {
            name: restName,
            geometry: {
                location: {
                    lat: tempCoords.geometry.location.lat,
                    lng: tempCoords.geometry.location.lng,
                },
            },
            place_id: null,
            rating: restRating,
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png"

        }
        setRestaurants([...restaurants, restDetails])
        setAddRestFlag(false)
    }

    return (

        <div className="addrest">
            <h1>Add Restaurant </h1>
            <form onSubmit={(e) => handleSubmit(e, restName, restRating)}>
                <input type="text" value={restName} onChange={(e) => setRestName(e.target.value)} placeholder="name" />
                <Rating
                    name="simple-controlled"
                    value={restRating}
                    onChange={(event, newValue) => {
                        if (newValue != null) {
                            setRestRating(parseInt(newValue));
                        }
                    }}
                />
                <button className="btn btn-lg btn-outline-primary">submit</button>
            </form>
        </div>
    )
}

export default AddRest