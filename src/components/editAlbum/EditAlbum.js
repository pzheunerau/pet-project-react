import { useParams } from "react-router-dom";

import { useFetchItem } from "../../hooks/useFetchItem";

import PageHeading from "../pageHeading/PageHeading";
import AlbumForm from "../albumForm/AlbumForm";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const EditAlbum = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchItem('albums', id);

  return (
    <>
      <PageHeading title="Edit album" goBack />
      {loading && <Spinner />}
      {error && <ErrorMessage title="Something went wrong"/>}
      {!(loading || error) && (
        <AlbumForm title={data.title} albumId={id} userId={data.userId} />
      )}
    </>
  )
}

export default EditAlbum;