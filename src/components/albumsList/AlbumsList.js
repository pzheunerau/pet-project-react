// import { useEffect } from "react";
import { Table } from "@chakra-ui/react";

// import { toaster } from "../../components/ui/toaster";

import { useFetchListItems } from "../../hooks/useFetchListItems";

import PageHeading from "../pageHeading/PageHeading";
import AlbumsItem from "../albumsItem/AlbumsItem";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const AlbumsList = () => {
  const { data, loading, error, request } = useFetchListItems('albums');

  // useEffect(() => {
  //   if (error) {
  //     toaster.create({
  //       title: "Not data yet",
  //       type: "error",
  //     })
  //   }
  // }, [error]);

  return (
    <>
      <PageHeading title="Albums" buttonTitle="Create album" link="create"/>
      {loading && <Spinner />}
      {error && <ErrorMessage/>}
      {!(loading || error) && (
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
            {data.map((item) => (
              <AlbumsItem key={item.id} {...item} callback={request}/>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  )
}

export default AlbumsList;