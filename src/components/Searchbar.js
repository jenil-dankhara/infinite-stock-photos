import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import {
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
import image from "./image.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TelegramIcon from "@mui/icons-material/Telegram";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Searchbar = () => {
  const [searchValue, setSearchVAlue] = useState("");
  const [apiData, setApiData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  console.log("searchValue", searchValue);

  useEffect(() => {
    if (searchValue !== "") {
      setTimeout(() => {
        ApiCall();
      }, 2000);
    }
  }, [page]);

  const ApiCall = async () => {
    await axios
      .get(
        `https://api.infinitestockphotos.com/search?prompt=${searchValue}&offset=${page}`
      )
      .then(function (response) {
        console.log("111", response.data.root.children);

        setApiData(apiData.concat(response.data.root.children));
      });
  };

  const handleClickSearch = () => {
    console.log("Seacrch Clicked");

    ApiCall();
  };

  const handleChange = (e) => {
    setSearchVAlue(e.target.value);
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  console.log("first", apiData);

  return (
    <>
      {/* ------ Searchbar Component ------- */}

      <FormControl
        sx={{
          m: 1,
          width: "100%",
          margin: "30px 0 30px 0",
          color: "#fff",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
        variant="outlined"
      >
        <OutlinedInput
          type="text"
          placeholder="search"
          value={searchValue}
          onChange={(e) => handleChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                // aria-label="toggle password visibility"
                onClick={handleClickSearch}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* ------ ImageCard Component --------- */}

      <InfiniteScroll
        dataLength={apiData?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          apiData?.length && (
            <h4 style={{ color: "#D9D9D9", textAlign: "center" }}>
              Loading...
            </h4>
          )
        }
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {apiData?.map((value, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <div class="img__wrap">
                  <CardMedia
                    className="img__img"
                    component="img"
                    image={value.fields.image_file_name}
                    alt="green iguana"
                  />
                  <p class="img__description">
                    This image looks super neat.
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Box>
                        <FavoriteBorderIcon />
                        <TelegramIcon />
                      </Box>
                      <StarBorderIcon />
                    </Box>
                  </p>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </InfiniteScroll>
    </>
  );
};

export default Searchbar;
