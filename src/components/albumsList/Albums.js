import { useSearchParams } from "react-router-dom";

import { useFetchListItems } from "../../hooks/useFetchListItems";

import {
  PageHeading, 
  Spinner, 
  ErrorMessage 
} from "..";

import { AlbumsSearchForm, AlbumsList } from "./components";

const Albums = () => {
  const { data, loading, error, request } = useFetchListItems('albums');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const filteredAlbums = data.filter(item => item.title.includes(searchQuery));

  return (
    <>
      <PageHeading title="Albums" linkTitle="Create album" link="create"/>
      {loading && <Spinner />}
      {error && <ErrorMessage/>}
      {!(loading || error) && (
        <>
          <AlbumsSearchForm searchQuery={searchQuery} setSearchParams={setSearchParams} />
          <AlbumsList data={filteredAlbums} request={request} />
        </>
      )}
    </>
  )
}

export default Albums;