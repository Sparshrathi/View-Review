import axios from "axios";

export default axios.create({
  baseURL: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses`,
  headers: {
    Authorization:
      "Bearer bF9s5YRqDiKt5F8xtZdwno2W1b13g-zyz-kdnMoCiWCrCOBzm9MnKugi0UOptd2eOYDC997RGodM7cBFWVxAsfjCE6aIeWD7Qu4dPZ-hJymKe9taOr_WafkFJ4AVX3Yx",
  },
});
