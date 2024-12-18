import { Link } from "react-router-dom";
import { Flex, Heading, Button } from "@chakra-ui/react";

const PageHeading = ({title, buttonTitle = "Back", link}) => {
  return (
    <Flex justifyContent="space-between" gap="5" mb="5">
      <Heading as="h1" size="3xl">{title}</Heading>
      {link && <Button as={Link} variant="outline" to={link} relative="path">{buttonTitle}</Button>}
    </Flex>
  )
}

export default PageHeading;