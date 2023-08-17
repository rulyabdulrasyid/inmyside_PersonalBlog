"use client";

import { useEffect, useState } from "react";
import ContentCard from "./contentCard";
import { Box, Container, SimpleGrid, Wrap } from "@chakra-ui/react";
import { fetchContent } from "@/fetching/fetchData";

function Dashboard() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      const contents = await fetchContent();
      setContents(contents);
    };
    fetchContents();
  }, []);

  return (
    <Container maxW="6xl">
      <Box mt={8}>
        <Wrap spacing={10} justify="center">
          {contents?.map((content, idx) => (
            <ContentCard key={idx} {...content} />
          ))}
        </Wrap>
      </Box>
    </Container>
  );
}

export default Dashboard;
