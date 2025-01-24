import { useState } from "react";
import { HStack } from "@chakra-ui/react"; 
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination";

import { useFetchListItems } from "../../hooks/useFetchListItems";
import { ErrorMessage, PageHeading, PostsList, Spinner } from "..";

const Posts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, loading, error } = useFetchListItems('posts');

  const postsOnPage = 10;
  const postsCount = data.length;
  const startPost = (pageNumber - 1) * postsOnPage;
  const endPost = startPost + postsOnPage;
  const visiblePosts = data.slice(startPost, endPost);

  return (
    <>
      <PageHeading title="Posts"/>
      {loading && <Spinner />}
      {error && <ErrorMessage/>}
      {!(loading || error) && (
        <PostsList data={visiblePosts}/>
      )}
      <PaginationRoot
        page={pageNumber}
        count={postsCount}
        pageSize={postsOnPage}
        onPageChange={(e) => setPageNumber(e.page)}
        mt={10}
      >
        <HStack justifyContent="center">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </>
  )
}

export default Posts;