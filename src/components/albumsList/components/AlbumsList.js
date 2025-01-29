import { Table } from "@chakra-ui/react";

import { AlbumsItem } from ".";

const AlbumsList = ({data, request}) => {
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
        {data.map((item) => (
          <AlbumsItem key={item.id} {...item} callback={request}/>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default AlbumsList;