import { Link, useNavigate } from "react-router-dom";
import { Flex, Heading, Button } from "@chakra-ui/react";

const PageHeading = ({title, linkTitle, link, goBack}) => {
  const navigate = useNavigate();
  const goBackHandle = () => navigate(-1);

  return (
    <Flex justifyContent={!title ? "flex-end" : "space-between"} gap="5" mb="5">
      {title && <Heading as="h1" size="3xl">{title}</Heading>}
      {link && <Button as={Link} variant="outline" to={link} relative="path">{linkTitle}</Button>}
      {goBack && <Button as={Link} variant="outline" onClick={goBackHandle}>Go Back</Button>}
    </Flex>
  )
}

export default PageHeading;