"use client";

import React, { useEffect, useState } from "react";
import {
  Flex,
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
  useToast,
} from "@chakra-ui/react";
import { fetchCategory } from "@/fetching/fetchData";
import { fetchContentById } from "@/fetching/fetchById";
import { usePathname } from "next/navigation";
import { updateContent } from "@/fetching/updateData";

const UpdateContent = ({ contentId, onUpdate }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState({});
  const pathname = usePathname();
  const [, , value] = pathname.split("/");
  const [category_id, setCategory_id] = useState();
  const toast = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await fetchContentById(value);
        setContent(content);
        setCategory_id(content.Categories[0].id);
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };
    fetchContent();
  }, [value]);

  // console.log(category_id);
  const [formData, setFormData] = useState({
    title: content.title,
    text: content.text,
    publication: content.publication,
    published_at: content.published_at,
    image: content.image,
    category_id: category_id,
  });

  useEffect(() => {
    setFormData({
      title: content.title,
      text: content.text,
      publication: content.publication,
      published_at: content.published_at,
      image: content.image,
      category_id: category_id,
    });
  }, [content]);

  // console.log(formData.category_id);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await fetchCategory();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  // console.log(categories);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    setFormData((prevData) => {
      return { ...prevData, category_id: categoryId };
    });
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");

    try {
      const updatedFormData = new FormData();
      for (const key in formData) {
        // updatedFormData.append(key, formData[key]);
        // console.log(formData);
        console.log(key, formData[key]);
      }
      // console.log(updatedFormData);
    } catch (error) {}
    // try {
    //   toast({
    //     title: "Content updated",
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // } catch (error) {
    //   console.error("Error updating content:", error);
    //   // Tampilkan pemberitahuan kesalahan kepada pengguna jika pembaruan gagal
    //   toast({
    //     title: "Error updating content",
    //     description: error.message,
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
  };

  return (
    <>
      <Button
        colorScheme="teal"
        onClick={() => {
          setOverlay(<OverlayOne />);
          setIsModalOpen(true);
        }}
      >
        EDIT
      </Button>
      <Modal
        isOpen={isModalOpen}
        isCentered
        onClose={() => setIsModalOpen(false)}
      >
        {overlay}
        <ModalContent>
          <ModalHeader
            borderBottomWidth="1px"
            bg="red"
            color="white"
            borderRadius={5}
          >
            EDIT CONTENT
          </ModalHeader>
          <ModalBody>
            <FormControl id="title" mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                focusBorderColor="red.400"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="text" mb={3}>
              <FormLabel>Text</FormLabel>
              <Textarea
                focusBorderColor="red.400"
                placeholder="Here is a sample placeholder"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="publication" mb={3}>
              <FormLabel>Publication</FormLabel>
              <Input
                placeholder="Enter name publication"
                focusBorderColor="red.400"
                name="publication"
                value={formData.publication}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="published_at" mb={3}>
              <FormLabel fontSize="sm">Published_at</FormLabel>
              <Input
                focusBorderColor="red.400"
                placeholder="Select Date and Time"
                type="datetime-local"
                name="published_at"
                value={formData.published_at}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="image" mb={3}>
              <FormLabel fontSize="sm">Image</FormLabel>
              <Input
                placeholder="Link Image"
                focusBorderColor="red.400"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="content_Category" mb={3}>
              <FormLabel fontSize="sm">Content Category</FormLabel>
              <Select
                value={formData.category_id}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <Flex pb={2} pl={4} justify="right" pr={4}>
            <Button size="sm" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateContent;
