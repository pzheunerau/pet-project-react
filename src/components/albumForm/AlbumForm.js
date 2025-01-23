import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Grid, GridItem, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Field } from "../../components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "../../components/ui/native-select";
import { toaster } from "../../components/ui/toaster";

import { ConfirmationDialog } from "./components";

import { useFetchListItems } from "../../hooks/useFetchListItems";
import { useCreateItem } from "../../hooks/useCreateItem";
import { useEditItem } from "../../hooks/useEditItem";

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  username: yup.string().required('Choose user'),
}).required();

const AlbumForm = ({userId, albumId, title}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [albumTitle, setAlbumTitle] = useState(null);
  const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   title: "Test",
    //   username: ""
    // }
  });

  const {
    data: users, 
    error: usersError, 
    loading: usersLoading,
    seccess: usersSeccess
  } = useFetchListItems('users');
  const { 
    request: onCreateItem, 
    data: createdItem, 
    loading: createdLoading,
    error: createdError, 
    seccess: createdSeccess 
  } = useCreateItem();
  const { 
    request: onEditItem, 
    data: editedItem, 
    loading: editedLoading,
    error: editedError, 
    seccess: editedSeccess 
  } = useEditItem();

  useEffect(() => {
    if (usersError) {
      toaster.create({
        title: "Cannot get users",
        description: "Try again later",
        type: "error"
      })
    }
  }, [usersError]);
  
  useEffect(() => {
    if (createdError) {
      toaster.create({
        title: "No album created",
        description: "Try again",
        type: "error"
      })
    }
  }, [createdError]);

  useEffect(() => {
    if (editedError) {
      toaster.create({
        title: "No album edited",
        description: "Try again",
        type: "error"
      })
    }
  }, [editedError]);

  useEffect(() => {
    if (createdSeccess) {
      setAlbumTitle(createdItem.title);
      setOpenDialog(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdSeccess]);
  
  useEffect(() => {
    if (editedSeccess) {
      setAlbumTitle(editedItem.title);
      setOpenDialog(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedSeccess]);

  useEffect(() => {
    if (usersSeccess && !!albumId) {
      const currentUserName = users.find(user => user.id === userId).username;
      setValue('username', currentUserName, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const isEditMode = !!albumId;
  const isLoadingResponse = usersLoading || createdLoading || editedLoading;
  const userList = users.map(item => item.username);

  const getUserId = (username) => {
    return (
      users.find(user => user.username === username).id
    )
  }

  const onSubmit = (data) => {
    const newAlbum = {
      title: data.title,
      userId: getUserId(data.username),
    }

    console.log(newAlbum);

    if (isEditMode) {
      onEditItem(newAlbum, albumId);
    } else {
      onCreateItem(newAlbum);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridTemplateColumns="repeat(2, 1fr)" gap="5">
          <GridItem>
            <Field
              label="Album title"
              invalid={!!errors.title}
              errorText={errors.title?.message}
            >
              <Input {...register("title", {
                required: "This is required",
                value: title,
                minLength: {
                  value: 3, 
                  message: "Min lenght is 3"
                }, 
                maxLength: {
                  value: 64, 
                  message: "Max lenght is 64"
                }
              })}/>
            </Field>
          </GridItem>
          <GridItem>
            <Field
              label="User"
              invalid={!!errors.username}
              errorText={errors.username?.message}
            >
              <NativeSelectRoot>
                <NativeSelectField
                  {...register("username")}
                  placeholder="Select User"
                  items={userList}
                />
              </NativeSelectRoot>
            </Field>
          </GridItem>
          <GridItem colSpan="2">
            <Stack direction="row" gap="2">
              <Button disabled={isLoadingResponse} type="submit">Submit</Button>
              <Button disabled={isLoadingResponse} type="reset">Cancel</Button>
            </Stack>
          </GridItem>
        </Grid>
      </form>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        albumTitle={albumTitle}
        isEditMode={isEditMode}
        callback={reset}
      />
    </>
  )
}

export default AlbumForm;