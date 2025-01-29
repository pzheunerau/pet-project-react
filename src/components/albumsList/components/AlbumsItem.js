import { useEffect } from "react";

import { Table, IconButton, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";

import { toaster } from "../../ui/toaster";

import { useDeleteItem } from "../../../hooks/useDeleteItem";

const AlbumsItem = (props) => {
  const { id, userId, title, callback } = props;
  const { request: onDeleteItem, loading, error, seccess } = useDeleteItem('albums', id);

  useEffect(() => {
    if (error) {
      console.log("error!!!")

      toaster.create({
        title: "Deletion failed!",
        description: "Something wrong with the deletion",
        type: "error"
      })
    }
  }, [error]);

  useEffect(() => {
    if (seccess) {
      callback();

      toaster.create({
        title: "Deletion successfully!",
        description: "Album deleted",
        type: "success"
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seccess]);

  const deleteHandle = () => {
    onDeleteItem();
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
            disabled={loading}
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