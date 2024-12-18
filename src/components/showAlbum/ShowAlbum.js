import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Tabs } from "@chakra-ui/react";

import usePlaceholderService from "../../services/PlaceholderService";

import PageHeading from "../pageHeading/PageHeading";
import AlbumInfo from "../albumInfo/AlbumInfo";
import AlbumPhotoList from "../photosList/PhotosList";
import Spinner from "../spinner/Spinner";

const ShowAlbum = () => {
  const {id} = useParams();
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(false);
  const { getAlbumById } = usePlaceholderService();

  useEffect(() => {
    onRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onRequest = () => {
    setLoading(true);
    getAlbumById(id)
      .then(onDataLoaded)
      .then(() => setLoading(false));
  }

  const onDataLoaded = (data) => {
    setAlbum(data);
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <PageHeading title={album.title} link="/albums"/>
      <Tabs.Root variant="outline" defaultValue="basic">
        <Tabs.List>
          <Tabs.Trigger value="basic">
            Basic
          </Tabs.Trigger>
          <Tabs.Trigger value="photos">
            Photos
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="basic">
          <AlbumInfo id={id} userId={album.userId} />
        </Tabs.Content>
        <Tabs.Content value="photos">
          <AlbumPhotoList id={id} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

export default ShowAlbum;