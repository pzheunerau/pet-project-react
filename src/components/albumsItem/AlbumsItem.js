import { Table, IconButton, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";

import usePlaceholderService from "../../services/PlaceholderService";

const AlbumsItem = (props) => {
  const { id, userId, title, callback } = props;
  const { deleteAlbumById } = usePlaceholderService();

  const deleteHandler = (id) => {
    deleteAlbumById(id).then(callback());
  }

  return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{userId}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <HStack gap="2">
          <IconButton as={Link} to={`${id}`} variant="outline" rounded="full" aria-label="Show">
            <LuEye />
          </IconButton>
          <IconButton
            as={Link}
            to={`${id}/edit`}
            variant="outline"
            rounded="full"
            aria-label="Edit"
          >
            <LuPencilLine />
          </IconButton>
          <IconButton
            variant="outline"
            rounded="full"
            aria-label="Delete"
            colorPalette="red"
            onClick={() => {
              deleteHandler(id)
            }}
          >
            <LuTrash2 />
          </IconButton>
        </HStack>
      </Table.Cell>
    </Table.Row>
  )
}

export default AlbumsItem;