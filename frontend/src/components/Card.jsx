import { Box, Image, Badge, Center } from "@chakra-ui/react";
import Noimage from "../images/noimage.jpg";
import { Link } from "react-router-dom";

function Card(props) {
  let imgUrl = "";
  if (props.ogpImageUrl === "not_found") {
    imgUrl = Noimage;
  } else {
    imgUrl = props.ogpImageUrl;
  }
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
    >
      <Link to={"/anime/" + props.title}>
        <Center>
          <Image src={imgUrl} alt={props.title} maxHeight="200px" />
        </Center>

        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {props.title}
          </Box>

          <Box d="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {props.productCompanies}
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default Card;
