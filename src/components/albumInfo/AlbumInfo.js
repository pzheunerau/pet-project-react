import { VStack, Text } from "@chakra-ui/react";

import { useFetchItem } from "../../hooks/useFetchItem";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const AlbumInfo = ({id, userId}) => {
  const { data, loading, error } = useFetchItem('users', userId);

  return (
    <>
      {loading && <Spinner />}
      {error && <ErrorMessage title="Something went wrong" />}
      {!(loading || error) && (
        <VStack gap="2" alignItems="start">
          <Text>ID: {id}</Text>
          <Text>Name: {data.username}</Text>
        </VStack>
      )}
    </>
  )
}

export default AlbumInfo;