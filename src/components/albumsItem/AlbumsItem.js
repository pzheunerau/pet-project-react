import { Table, IconButton, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";

import { toaster } from "../../components/ui/toaster";

import { useDeleteItem } from "../../hooks/useDeleteItem";

const AlbumsItem = (props) => {
  const { id, userId, title, callback } = props;
  const { request: onDeleteItem } = useDeleteItem('albums', id);

  const deleteHandle = () => {
    onDeleteItem()
    .then(callback())
    .catch(error => console.log(error));

    toaster.promise(onDeleteItem, {
      success: {
        title: "Deletion successfully!",
        description: "Album deleted",
      },
      error: {
        title: "Deletion failed!",
        description: "Something wrong with the deletion",
      },
      loading: { 
        title: "Loading...",
        description: "Please wait" 
      },
    })
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
              deleteHandle()
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