import PageHeading from "../pageHeading/PageHeading";
import AlbumForm from "../albumForm/AlbumForm";

const CreateAlbum = () => {
  return (
    <>
      <PageHeading title="Create album" link="/albums"/>
      <AlbumForm/>
    </>
  )
}

export default CreateAlbum;