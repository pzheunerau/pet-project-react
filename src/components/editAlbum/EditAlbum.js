import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import usePlaceholderService from "../../services/PlaceholderService";

import PageHeading from "../pageHeading/PageHeading";
import AlbumForm from "../albumForm/AlbumForm";

import Spinner from "../spinner/Spinner";

const EditAlbum = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [albumTitle, setAlbumTitle] = useState();
  const [loading, setLoading] = useState(false);
  const { getAlbumById } = usePlaceholderService();

  useEffect(() => {
    onRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onRequest = () => {
    setLoading(true);
    getAlbumById(id)
      .then((data) => {
        setUserId(data.userId);
        setAlbumTitle(data.title);
      })
      .then(() => setLoading(false));
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <PageHeading title="Edit album" link="/albums" />
      <AlbumForm title={albumTitle} id={id} userId={userId} />
    </>
  )
}

export default EditAlbum;