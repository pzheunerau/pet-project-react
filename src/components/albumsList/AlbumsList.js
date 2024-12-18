import { useState, useEffect } from "react";
import { Table } from "@chakra-ui/react";

import usePlaceholderService from "../../services/PlaceholderService";

import PageHeading from "../pageHeading/PageHeading";
import AlbumsItem from "../albumsItem/AlbumsItem";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { getAllAlbums } = usePlaceholderService();

  useEffect(() => {
    onRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = () => {
    setLoading(true);
    getAllAlbums()
      .then(onDataLoaded)
      .then(() => setLoading(false))
      .catch(onError);
  }

  const onDataLoaded = (data) => {
    setAlbums(data);
  }

  const onError = () => {
    setError(true);
    setLoading(loading => false);
  }

  function renderItems(arr) {
    const albumsList = arr.map(item => {
      return (
        <AlbumsItem key={item.id} {...item} callback={onRequest}/>
      )
    })

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Id</Table.ColumnHeader>
            <Table.ColumnHeader>User Id</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {albumsList}
        </Table.Body>
      </Table.Root>
    )
  }

  const items = renderItems(albums);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <>
      <PageHeading title="Albums" buttonTitle="Create album" link="create"/>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default AlbumsList;