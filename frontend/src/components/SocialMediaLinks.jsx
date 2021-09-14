import { ButtonGroup, IconButton } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="https://twitter.com/uutan1108"
      aria-label="LinkedIn"
      icon={<FaTwitter fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://github.com/OHMORIYUSUKE"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://github.com/Project-ShangriLa/sora-playframework-scala"
      aria-label="Twitter"
      icon={<AiFillApi fontSize="20px" />}
    />
  </ButtonGroup>
);
