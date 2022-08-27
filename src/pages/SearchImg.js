import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TelegramIcon from "@mui/icons-material/Telegram";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { searchApi } from "../services";

const useStyles = makeStyles({
  img__wrap: {
    position: "relative",
    "&:hover": {
      "& $img__description": {
        visibility: "visible",
        opacity: "1",
      },
    },
  },
  img__description: {
    padding: "10px",
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    visibility: "hidden",
    opacity: "0",
    margin: "0",

    /* transition effect. not necessary */
    transition: "opacity 0.2s, visibility 0.2s",
  },

  custom_form_control: {
    width: "100%",
    margin: "30px 0 30px 0 !important",
    color: "#fff",
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
});

const SearchImg = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  console.log("searchValue", searchValue);

  const classes = useStyles();

  useEffect(() => {
    if (searchValue !== "") {
      searchApi(searchValue, page)
        .then(function (response) {
          console.log("Response Data", response.data.root.children);
          setSearchData(searchData.concat(response.data.root.children));
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    }
  }, [page]);

  const ApiCall = () => {
    searchApi(searchValue, page)
      .then(function (response) {
        console.log("Response Data", response.data.root.children);
        setSearchData(response.data.root.children);
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };

  const handleClickSearch = () => {
    ApiCall();
  };

  console.log("first", searchData);

  return (
    <>
      {/* ------ Searchbar Component ------- */}
      <FormControl className={classes.custom_form_control} variant="outlined">
        <OutlinedInput
          type="text"
          placeholder="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {/* ------ ImageCard Component --------- */}
      <InfiniteScroll
        dataLength={searchData?.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={
          searchData?.length && (
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
            {searchData?.map((value, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Box className={classes.img__wrap}>
                  <CardMedia
                    className={classes.img__img}
                    component="img"
                    image={value.fields.image_file_name}
                    alt="green iguana"
                  />
                  <Box className={classes.img__description}>
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
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </InfiniteScroll>
    </>
  );
};

export default SearchImg;
