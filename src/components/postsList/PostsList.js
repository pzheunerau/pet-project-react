// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Link as ChakraLink } from "@chakra-ui/react";

// import { toaster } from "../../components/ui/toaster";

import { useFetchListItems } from "../../hooks/useFetchListItems";

import PageHeading from "../pageHeading/PageHeading";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const PostsList = () => {
  const { data, loading, error } = useFetchListItems('posts');

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
      <PageHeading title="Posts"/>
      {loading && <Spinner />}
      {error && <ErrorMessage/>}
      {!(loading || error) && (
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
            {data.map((item) => (
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
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  )
}

export default PostsList;