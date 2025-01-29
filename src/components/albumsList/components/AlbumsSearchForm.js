import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Button, Grid, GridItem } from "@chakra-ui/react";

import { Field } from "../../ui/field";

const AlbumsSearchForm = ({searchQuery, setSearchParams}) => {
  const [search, setSearch] = useState(searchQuery);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const query = data.search;

    setSearchParams({search: query});
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap="5" alignItems="start">
        <GridItem>
          <Field>
            <Input {...register("search")} value={search} onChange={e => setSearch(e.target.value)}/>
          </Field>
        </GridItem>
        <GridItem>
          <Button type="submit">Search</Button>
        </GridItem>
      </Grid>
    </form>
  )
}

export default AlbumsSearchForm;