import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Tabs } from "@chakra-ui/react";
import { toaster } from "../../components/ui/toaster";

import { useFetchItem } from "../../hooks/useFetchItem";

import PageHeading from "../pageHeading/PageHeading";
import AlbumInfo from "../albumInfo/AlbumInfo";
import AlbumPhotoList from "../photosList/PhotosList";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ShowAlbum = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetchItem('albums', id);

  useEffect(() => {
    if (error) {
      toaster.create({
        title: "Something went wrong",
        type: "error",
      })

      const timer = setTimeout(() => navigate('/albums'), 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      {loading && <Spinner />}
      {error && 
        <>
          <PageHeading goBack/>
          <ErrorMessage title="Something went wrong" />
        </>
      }
      {!(loading || error) && (
        <>
          <PageHeading title={data.title} goBack/>
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
      )}
    </>
  )
}

export default ShowAlbum;