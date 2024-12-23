import { useParams } from "react-router-dom";

import { useFetchItem } from "../../hooks/useFetchItem";

import PageHeading from "../pageHeading/PageHeading";
import AlbumForm from "../albumForm/AlbumForm";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const EditAlbum = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchItem('albums', id);

  const Form = () => {
    return (
      <AlbumForm title={data.title} id={id} userId={data.userId} />
    )
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <Form /> : null;

  return (
    <>
      <PageHeading title="Edit album" link="/albums" />
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default EditAlbum;