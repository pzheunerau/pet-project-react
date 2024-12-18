import { useState, useEffect } from "react";
import { VStack, Text } from "@chakra-ui/react";

import usePlaceholderService from "../../services/PlaceholderService";

import Spinner from "../spinner/Spinner";

const AlbumInfo = ({id, userId}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { getUserById } = usePlaceholderService();

  console.log(`Info album id ${id}`);
  console.log(`Info album userId ${userId}`);

  useEffect(() => {
    onRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const  onRequest = () => {
    // setLoading(true);
    // getUserById(userId)
    //   .then(onDataLoaded)
    //   .then(() => setLoading(false));
  }

  const onDataLoaded = (data) => {
    setUser(data);
  }

  if (loading) {
    return <Spinner/>
  }

  return (
    <VStack gap="2" alignItems="start">
      <Text>ID: {id}</Text>
      <Text>Name: user.username</Text>
    </VStack>
  )
}

export default AlbumInfo;