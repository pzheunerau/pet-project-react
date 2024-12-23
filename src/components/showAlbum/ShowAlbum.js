import { useParams } from "react-router-dom";

import { Tabs } from "@chakra-ui/react";

import { useFetchItem } from "../../hooks/useFetchItem";

import PageHeading from "../pageHeading/PageHeading";
import AlbumInfo from "../albumInfo/AlbumInfo";
import AlbumPhotoList from "../photosList/PhotosList";
import Spinner from "../spinner/Spinner";

const ShowAlbum = () => {
  const {id} = useParams();
  const { data, loading } = useFetchItem('albums', id);

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <PageHeading title={data.title} link="/albums"/>
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
          <AlbumInfo id={id} userId={data.userId} />
        </Tabs.Content>
        <Tabs.Content value="photos">
          <AlbumPhotoList id={id} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

export default ShowAlbum;