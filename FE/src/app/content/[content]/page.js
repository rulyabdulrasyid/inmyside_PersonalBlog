"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  Avatar,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  formData,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { fetchContentById } from "@/fetching/fetchById";
import { usePathname, useRouter } from "next/navigation";

import { UpdateContent } from "@/components";

export default function DetailContentPage({ contentId }) {
  const [content, setContent] = useState({});
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();
  const [, , value] = pathname.split("/");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await fetchContentById(value);
        setContent(content);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setLoading(true);
      }
    };
    fetchContent();
  }, [value]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Flex mt={20} justify="center">
        <Container maxW={"6xl"}>
          <DetailContentCard content={content} />
        </Container>
      </Flex>
    </div>
  );
}

// export default DetailContentPage;

const DetailContentCard = ({ content }) => {
  const categoryName = content.Categories[0].name;
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Stack p="4" boxShadow="lg" m="3" borderRadius="md">
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar src={"https://avatars0.githubusercontent.com/u/1164541?v=4"} />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>{content.publication}</Text>
          <Text color={"gray.500"}>{content.published_at}</Text>
        </Stack>
      </Stack>
      <Heading
        color={useColorModeValue("gray.700", "white")}
        fontSize={"5xl"}
        fontFamily={"body"}
      >
        {content.title}
      </Heading>
      <Box bg={"gray.100"} borderRadius="md">
        <Image src={content.image} alt="Example" />
      </Box>
      <Stack>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
        >
          {categoryName}
        </Text>

        <Text color={"gray.500"}>{content.text}</Text>
        <Box>
          {!isLogin ? (
            <Button onClick={() => router.push("/")}>HOME</Button>
          ) : (
            <Flex gap={2}>
              <Button onClick={() => router.push("/")}>HOME</Button>
              <UpdateContent />
            </Flex>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};
