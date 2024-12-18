import { Link } from "react-router-dom";
import { Heading, Center, Container, Text, Button } from "@chakra-ui/react";

const Page404 = () => {
  return (
    <Container minH="100vh">
      <Center minH="100vh" gap="4" flexDirection="column">
        <Heading as="h1" size="7xl">404</Heading>
        <Text fontSize="3xl">Page not found</Text>
        <Button as={Link} to="/" variant="outline">Go to Dashboard</Button>
      </Center>
    </Container>
  )
}

export default Page404;