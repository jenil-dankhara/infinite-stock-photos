import axios from "axios";

export const searchApi = (searchValue, page) => {
  return axios.get(
    `${process.env.REACT_APP_SEARCH_API_URL}/search?prompt=${searchValue}&offset=${page}`
  );
};
