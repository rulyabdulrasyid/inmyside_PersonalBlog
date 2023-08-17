"use client";

import { baseUrl } from "@/fetching/fetchData";
import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
  Spacer,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteContent } from "@/fetching/deleteData";

export default function ContentCard(props) {
  const { id, title, text, publication, published_at, image } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [contentList, setContentList] = useState([]);
  const router = useRouter();
  const toast = useToast();

  const handleContentDetail = (contentId) => {
    router.push(`/content/${contentId}`);
  };

  const handleDelete = async (contentId) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      await deleteContent(contentId, accessToken);
      toast({
        title: "Content deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const updatedContentList = contentList.filter(
        (content) => content.id !== contentId
      );
      setContentList(updatedContentList);
      router.push("/");
    } catch (error) {
      toast({
        title: "Error deleting content",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Stack>
      <Box
        maxW={"346px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={image} fill alt="Example" />
        </Box>
        <Stack>
          {/* <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Blog
          </Text> */}
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>

          <Text color={"gray.500"} noOfLines={3}>
            {text}
          </Text>
        </Stack>
        <Stack mt={6} direction={"column"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{publication}</Text>
            <Text color={"gray.500"}>{published_at}</Text>
          </Stack>{" "}
          {/* <Spacer /> */}
          <HStack>
            {!isLogin ? (
              <Button onClick={() => handleContentDetail(id)}>MORE</Button>
            ) : (
              <>
                <Button onClick={() => handleContentDetail(id)}>MORE</Button>
                <Button colorScheme="red" onClick={() => handleDelete(id)}>
                  DELETE
                </Button>
              </>
            )}
          </HStack>
        </Stack>
      </Box>
    </Stack>
  );
}
