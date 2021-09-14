import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Alert,
  AlertIcon,
  Center,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { whenData, nowYearAndCool } from "../utils/formWhen";
import { FiAlertTriangle } from "react-icons/fi";

const Index = () => {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let userSelectYearAndCool = "";
  if (localStorage.getItem("when")) {
    userSelectYearAndCool = localStorage.getItem("when");
  } else {
    userSelectYearAndCool = nowYearAndCool;
  }
  const [value, setValue] = React.useState(userSelectYearAndCool);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log(value);

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("animeData" + value)) {
          localStorage.setItem("when", value);
          const JSONDATA = JSON.parse(
            localStorage.getItem("animeData" + value)
          );
          setAnimeData(JSONDATA);
        } else {
          setIsLoading(true);
          localStorage.setItem("when", value);
          const res = await axios.get("http://localhost:3031/api/v1/" + value, {
            timeout: 3000000,
          });
          localStorage.setItem("animeData" + value, JSON.stringify(res.data));
          setAnimeData(res.data);
          setIsLoading(false);
        }
        const res = await axios.get("http://localhost:3031/api/v1/" + value, {
          timeout: 3000000,
        });
        localStorage.setItem("animeData" + value, JSON.stringify(res.data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [value]);

  console.log(animeData);

  //const when = localStorage.getItem("when");
  const yearNumber = userSelectYearAndCool.slice(0, 4);
  const coolNumber = userSelectYearAndCool.slice(-1);

  let coolName = "";
  switch (coolNumber) {
    case "1":
      coolName = "冬";
      break;
    case "2":
      coolName = "春";
      break;
    case "3":
      coolName = "夏";
      break;
    default:
      coolName = "秋";
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <Box mt={7} mb={7} ml={5} mr={5}>
          <FormControl id="when">
            <FormLabel>アニメの放送時期</FormLabel>
            <Select
              onChange={handleChange}
              placeholder="知りたい放送時期を選択してください"
            >
              {whenData.map((data) => (
                <option value={data.year + "/" + data.index}>
                  {data.year} / {data.cool}アニメ
                </option>
              ))}
            </Select>
          </FormControl>
          <Alert status="warning" mt={3}>
            <AlertIcon />
            {yearNumber + " / " + coolName}
            アニメ が選択されています。表示まで時間がかかることがあります。
          </Alert>
        </Box>
        <Box mt={7} mb={7} ml={5} mr={5}>
          <Loading />
        </Box>
        <Footer />
      </>
    );
  }

  //データがないとき
  if (animeData.message === "no_data") {
    return (
      <>
        <Header />
        <Box mt={7} mb={7} ml={5} mr={5}>
          <FormControl id="when">
            <FormLabel>アニメの放送時期</FormLabel>
            <Select
              onChange={handleChange}
              placeholder="知りたい放送時期を選択してください"
            >
              {whenData.map((data) => (
                <option value={data.year + "/" + data.index}>
                  {data.year} / {data.cool}アニメ
                </option>
              ))}
            </Select>
          </FormControl>
          <Alert status="warning" mt={3}>
            <AlertIcon />
            {yearNumber + " / " + coolName}
            アニメ が選択されています。表示まで時間がかかることがあります。
          </Alert>
        </Box>
        <Box mt={7} mb={7} ml={5} mr={5}>
          <Center mt={20}>
            <Center bg="teal" h="200px" color="white" borderRadius="lg">
              <Text fontSize="xl" pr={30} pl={30}>
                <FiAlertTriangle
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                />
                データがありません。 もう一度選択してください。
                <FiAlertTriangle
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                />
              </Text>
            </Center>
          </Center>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Box mt={7} mb={7} ml={5} mr={5}>
        <FormControl id="when">
          <FormLabel>アニメの放送時期</FormLabel>
          <Select
            onChange={handleChange}
            placeholder="知りたい放送時期を選択してください"
          >
            {whenData.map((data) => (
              <option value={data.year + "/" + data.index}>
                {data.year} / {data.cool}アニメ
              </option>
            ))}
          </Select>
        </FormControl>
        <Alert status="success" mt={3}>
          <AlertIcon />
          {yearNumber + " / " + coolName}
          アニメ が表示されています。
        </Alert>
      </Box>
      <Box mt={7} mb={7} ml={5} mr={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {animeData.map((data) => (
            <Card
              title={data.title}
              titleEn={data.title_en}
              productCompanies={data.product_companies}
              ogpImageUrl={data.ogp_image_url}
              ogpDescription={data.ogp_description}
              publicUrl={data.public_url}
              twitterAccount={data.twitter_account}
              twitterHashTag={data.twitter_hash_tag}
              sex={data.sex}
              sequel={data.sequel}
            />
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Index;
