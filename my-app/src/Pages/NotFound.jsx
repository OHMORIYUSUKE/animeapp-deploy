import React from "react";
import { Link } from "react-router-dom";
import { Center, Text } from "@chakra-ui/react";
import { AiOutlineCaretRight } from "react-icons/ai";
import Footer from "../components/Footer";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div>
      <Header />
      <Center mt={70}>
        <Center bg="teal" h="200px" w="400px" color="white" borderRadius="lg">
          <Text fontSize="4xl">404 NotFound</Text>
        </Center>
      </Center>
      <Center mt={30} mb={20}>
        <Link to="/">
          TOPページへ{" "}
          <AiOutlineCaretRight
            style={{ display: "inline-flex", verticalAlign: "middle" }}
          />
        </Link>
      </Center>
      <Footer />
    </div>
  );
};

export default NotFound;
