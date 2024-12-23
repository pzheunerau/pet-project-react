import { Table } from "@chakra-ui/react";

import { useFetchListItems } from "../../hooks/useFetchListItems";

import PageHeading from "../pageHeading/PageHeading";
import AlbumsItem from "../albumsItem/AlbumsItem";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const AlbumsList = () => {
  const { data, loading, error, request } = useFetchListItems('albums');

  function renderItems(arr) {
    const albumsList = arr.map(item => {
      return (
        <AlbumsItem key={item.id} {...item} callback={request}/>
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

  const items = renderItems(data);

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