import * as React from "react";
import { Spinner, Center } from "@chakra-ui/react";

export const Loading = () => (
  <>
    <Center mt={8} mb={8}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Center>
  </>
);

export default Loading;
