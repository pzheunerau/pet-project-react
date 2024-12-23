import { Link } from 'react-router-dom';
import { Table, Link as ChakraLink } from "@chakra-ui/react";

import { useFetchListItems } from "../../hooks/useFetchListItems";

import PageHeading from "../pageHeading/PageHeading";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const PostsList = () => {
  const { data, loading, error } = useFetchListItems('posts');

  function renderItems (arr) {
    const postsList = arr.map(item => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>
            <ChakraLink as={Link} to={`/posts/${item.id}`} variant="underline">
              {item.title} 
            </ChakraLink>
          </Table.Cell>
          <Table.Cell>{item.userId}</Table.Cell>
          <Table.Cell>{item.body}</Table.Cell>
        </Table.Row>
      )
    });

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row style={{textWrap: 'nowrap'}}>
            <Table.ColumnHeader>Post Id</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>User Id</Table.ColumnHeader>
            <Table.ColumnHeader>Post Desc</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {postsList}
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
      <PageHeading title="Posts"/>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default PostsList;