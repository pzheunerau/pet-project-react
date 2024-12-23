import { Table, IconButton } from "@chakra-ui/react";
import { LuEye } from "react-icons/lu";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useFetchListItems } from "../../hooks/useFetchListItems";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const PhotosList = ({id}) => {
  const { data, loading, error } = useFetchListItems(`albums/${id}/photos`);

  function renderItems (arr) {
    const photosList = arr.map(item => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>
            <img src={item.thumbnailUrl} alt={item.title} />
          </Table.Cell>
          <Table.Cell>
            <ImageShowDialog title={item.title} src={item.url} />
          </Table.Cell>
        </Table.Row>
      )
    })

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Id</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Preview</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {photosList}
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
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const ImageShowDialog = ({title, src}) => {
  return (
    <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <IconButton variant="outline" rounded="full" aria-label="Show Image">
          <LuEye />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <img src={src} alt={title} />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default PhotosList;