import PageHeading from "../pageHeading/PageHeading";
import AlbumForm from "../albumForm/AlbumForm";

const CreateAlbum = () => {
  return (
    <>
      <PageHeading title="Create album" goBack/>
      <AlbumForm/>
    </>
  )
}

export default CreateAlbum;