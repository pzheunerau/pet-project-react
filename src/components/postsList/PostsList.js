import { Link } from 'react-router-dom';
import { Table, Link as ChakraLink } from "@chakra-ui/react";

const PostsList = ({data}) => {
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
  )
}

export default PostsList;