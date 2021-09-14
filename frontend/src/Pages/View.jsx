import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import {
  Center,
  Box,
  Container,
  Text,
  Image,
  Divider,
  Link,
  Flex,
  Button,
} from "@chakra-ui/react";
import Noimage from "../images/noimage.jpg";
import { RiBuildingFill } from "react-icons/ri";
import { BiLinkExternal, BiBadgeCheck } from "react-icons/bi";
import { BsHash } from "react-icons/bs";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { GrUserManager, GrUserFemale } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";

const View = () => {
  let { name } = useParams();

  const when = localStorage.getItem("when");
  const JSONDATA = JSON.parse(localStorage.getItem("animeData" + when));

  const getAnimeDataByName = (name) => {
    const animeIndex = JSONDATA.findIndex((data) => data.title === name);
    return JSONDATA[animeIndex];
  };

  const animeDataMatched = getAnimeDataByName(name);

  console.log(animeDataMatched);

  if (animeDataMatched.ogp_image_url === "not_found") {
    animeDataMatched.ogp_image_url = Noimage;
  }
  if (animeDataMatched.ogp_description === "not_found") {
    animeDataMatched.ogp_description = "";
  }

  if (animeDataMatched.sequel === 0) {
    animeDataMatched.sequel = 1;
  }

  const history = useHistory();
  const toTop = () => {
    history.push("/");
  };

  return (
    <>
      <Header />
      <Center mt={30}>
        <Container maxW="4xl" centerContent>
          <Box padding="4" bg="gray.100" maxW="4xl">
            <Center>
              <Image
                src={animeDataMatched.ogp_image_url}
                alt={animeDataMatched.title}
              />
            </Center>
            <Text fontSize="3xl" mt={3}>
              {animeDataMatched.title}
            </Text>
            <Text fontSize="md" color="gray.600" mb={3}>
              {animeDataMatched.title_en}
            </Text>
            <Divider />
            <Text fontSize="xl" mt={5} mb={5}>
              {animeDataMatched.ogp_description}
            </Text>
            <Flex>
              <Text fontSize="xl" mr={6}>
                <RiBuildingFill
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                />
                {animeDataMatched.product_companies !== ""
                  ? animeDataMatched.product_companies
                  : "制作会社不明"}
              </Text>
              <Text fontSize="xl" mr={6}>
                全 {animeDataMatched.sequel} 期
              </Text>
              {animeDataMatched.sex ? (
                <Text fontSize="xl">
                  <GrUserFemale
                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                  />
                  女性向け
                </Text>
              ) : (
                <Text fontSize="xl">
                  <GrUserManager
                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                  />{" "}
                  男性向け
                </Text>
              )}
            </Flex>
            <Flex mt={2}>
              <Text mr={6} fontSize="lg">
                <Link
                  href={
                    "https://twitter.com/hashtag/" +
                    animeDataMatched.twitter_hash_tag
                  }
                  color="teal.500"
                >
                  <BsHash
                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                  />
                  {animeDataMatched.twitter_hash_tag}
                </Link>
              </Text>
              <Text mr={6} fontSize="lg">
                <Link
                  color="teal.500"
                  href={
                    "https://twitter.com/" + animeDataMatched.twitter_account
                  }
                >
                  <FaTwitter
                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                  />{" "}
                  {animeDataMatched.title}{" "}
                  <BiBadgeCheck
                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                  />
                </Link>
              </Text>
            </Flex>
            <Text fontSize="lg" mt={4}>
              <Link color="teal.500" href={animeDataMatched.public_url}>
                公式サイト
                <BiLinkExternal
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                />
              </Link>
            </Text>
          </Box>
        </Container>
      </Center>
      <Center mt={10}>
        <Button colorScheme="teal" variant="outline" size="lg" onClick={toTop}>
          <AiOutlineCaretLeft
            style={{ display: "inline-flex", verticalAlign: "middle" }}
          />{" "}
          戻る
        </Button>
      </Center>
      <Footer />
    </>
  );
};
export default View;
