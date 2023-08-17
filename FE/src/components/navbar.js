"use client";

import {
  Container,
  Flex,
  Heading,
  Spacer,
  Box,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Logo from "./logo";
import ToogleTheme from "./toogleTheme";
import LoginBox from "./loginBox";
import Link from "next/link";

const LinkItem = ({ href, path, children }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray.200", "whiteAlpha.900");

  return (
    <Link
      passHref
      href={href}
      p={2}
      bg={active ? "glassTeal" : undefined}
      color={active ? "#202023" : inactiveColor}
      _hover={{ color: useColorModeValue("red", "gray.500") }}
    >
      {children}
    </Link>
  );
};

function Navbar() {
  return (
    <div>
      <Flex
        boxShadow="lg"
        justifyContent="center"
        position="fixed"
        zIndex={1}
        top={0}
        width="100%"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <Container
          as={Flex}
          flexDirection={{ base: "row", md: "row" }}
          maxW="6xl"
          alignItems="center"
          gap="10"
          // style={{ backdropFilter: "blur(10px)" }}
          zIndex={1}
          p={{ base: 1, md: 2, lg: 2 }}
          transform="auto"
          // mt={1}
          // bg={"black"}
        >
          <Flex align="center">
            <Heading as="h1" size="xl" p={2} pt={0} pb={0}>
              <Logo />
            </Heading>
          </Flex>
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            gap={8}
            fontSize={{ base: "15px", md: "20px", lg: "25px" }}
            fontWeight="hairline"
            color={useColorModeValue("black", "white")}
          >
            <LinkItem href="/about">about</LinkItem>
            <LinkItem href="/portfolio">portfolio</LinkItem>
            <LinkItem href="/blog">blog</LinkItem>
            <LinkItem href="/contact">contact</LinkItem>
          </Stack>
          <Spacer />
          <Flex align="right" gap={1} mr={4}>
            <Box>
              <ToogleTheme />
            </Box>
            <Stack>
              <LoginBox />
            </Stack>
          </Flex>
        </Container>
      </Flex>
    </div>
  );
}

export default Navbar;
