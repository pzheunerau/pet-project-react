import { useParams } from "react-router-dom";

import { VStack, HStack, Text } from "@chakra-ui/react";

import { useFetchItem } from "../../hooks/useFetchItem";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ShowPost = () => {
  const {id} = useParams();
  const { data, loading, error } = useFetchItem('posts', id);

  const Post = () => {
    return (
      <VStack alignItems="start">
        <HStack alignItems="baseline">
          <Text fontSize="xl" fontWeight="semibold">Id:</Text>
          <Text>{data.id}</Text>
        </HStack>
        <HStack alignItems="baseline">
          <Text fontSize="xl" fontWeight="semibold">Title:</Text>
          <Text>{data.title}</Text>
        </HStack>
        <HStack alignItems="baseline">
          <Text fontSize="xl" fontWeight="semibold">User Id:</Text>
          <Text>{data.userId}</Text>
        </HStack>
        <HStack alignItems="baseline">
          <Text fontSize="xl" fontWeight="semibold">Body:</Text>
          <Text>{data.body}</Text>
        </HStack>
      </VStack>
    )
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <Post /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default ShowPost;