import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { VStack, HStack, Text } from "@chakra-ui/react";

import { toaster } from "../../components/ui/toaster";

import { useFetchItem } from "../../hooks/useFetchItem";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PageHeading from "../pageHeading/PageHeading";

const ShowPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetchItem('posts', id);

  useEffect(() => {
    if (error) {
      toaster.create({
        title: "Something went wrong",
        type: "error",
      })

      const timer = setTimeout(() => navigate('/posts'), 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <PageHeading goBack/>
      {loading && <Spinner />}
      {error && <ErrorMessage title="Something went wrong"/>}
      {!(loading || error) && (
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
      )}
    </>
  )
}

export default ShowPost;