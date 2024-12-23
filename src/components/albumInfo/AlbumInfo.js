import { VStack, Text } from "@chakra-ui/react";

import { useFetchItem } from "../../hooks/useFetchItem";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const AlbumInfo = ({id, userId}) => {
  const { data, loading, error } = useFetchItem('users', userId);

  const Info = () => {
    return (
      <VStack gap="2" alignItems="start">
        <Text>ID: {id}</Text>
        <Text>Name: {data.username}</Text>
      </VStack>
    )
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <Info/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default AlbumInfo;