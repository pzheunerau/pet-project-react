import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { VStack, HStack, Text } from "@chakra-ui/react";

import usePlaceholderService from "../../services/PlaceholderService";

const ShowPost = () => {
  const {id} = useParams();
  const [post, setPost] = useState({});
  const { getPostById } = usePlaceholderService();

  useEffect(() => {
    onRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onRequest = () => {
    getPostById(id).then(onDataLoaded);
  }

  const onDataLoaded = (data) => {
    setPost(data);
  }

  return (
    <VStack alignItems="start">
      <HStack alignItems="baseline">
        <Text fontSize="xl" fontWeight="semibold">Id:</Text>
        <Text>{post.id}</Text>
      </HStack>
      <HStack alignItems="baseline">
        <Text fontSize="xl" fontWeight="semibold">Title:</Text>
        <Text>{post.title}</Text>
      </HStack>
      <HStack alignItems="baseline">
        <Text fontSize="xl" fontWeight="semibold">User Id:</Text>
        <Text>{post.userId}</Text>
      </HStack>
      <HStack alignItems="baseline">
        <Text fontSize="xl" fontWeight="semibold">Body:</Text>
        <Text>{post.body}</Text>
      </HStack>
    </VStack>
  )
}

export default ShowPost;