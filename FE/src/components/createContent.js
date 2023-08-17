import {
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Box,
  Stack,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { fetchCategory } from "@/fetching/fetchData";
import { postContent } from "@/fetching/postData";
import { useRouter } from "next/navigation";

export default function CreateContent() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    text: "",
    publication: "",
    published_at: "",
    image: "",
    category_id: 0,
  });
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await fetchCategory();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleCategoryChange = (e) => {
    setDetails((prev) => {
      const categoryId = parseInt(e.target.value);
      return { ...prev, category_id: categoryId };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem("accessToken");
    e.preventDefault();
    console.log(details.category_id);
    try {
      await postContent(
        details.title,
        details.text,
        details.publication,
        details.published_at,
        details.image,
        details.category_id,
        accessToken
      );
      handleCloseModal();
      router.push("/");
      toast({
        title: "Content Added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed to add new content",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Tooltip hasArrow label="Add Content" bg="teal">
        <Button
          colorScheme="teal"
          onClick={() => {
            setOverlay(<OverlayOne />);
            handleOpenModal();
          }}
        >
          {<AddIcon />}
        </Button>
      </Tooltip>

      <Modal isCentered isOpen={isOpen} onClose={handleCloseModal} bord>
        {overlay}
        <ModalContent>
          <ModalHeader
            borderBottomWidth="1px"
            bg="red"
            color="white"
            borderRadius={5}
          >
            CREATE NEW CONTENT
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Stack>
              <Box>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Please enter a title"
                  focusBorderColor="red.400"
                  name="title"
                  value={details.title}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel>Text</FormLabel>
                <Textarea
                  focusBorderColor="red.400"
                  placeholder="Here is a sample placeholder"
                  name="text"
                  value={details.text}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel>Publication</FormLabel>
                <Input
                  placeholder="Enter name publication"
                  focusBorderColor="red.400"
                  name="publication"
                  value={details.publication}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel>Published at</FormLabel>
                <Input
                  focusBorderColor="red.400"
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  name="published_at"
                  value={details.published_at}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Link Image"
                  focusBorderColor="red.400"
                  name="image"
                  value={details.image}
                  onChange={handleChange}
                />
                {/* <Input
                  variant="ghost"
                  size="sm"
                  type="file"
                  accept="image/*"
                  mb={4}
                /> */}
              </Box>
              <Box>
                <FormLabel>Content Category</FormLabel>
                <Select
                  value={details.category_id}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
