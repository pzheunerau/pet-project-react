import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Grid, GridItem, Stack, createListCollection } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Field } from "../../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import { NativeSelectField, NativeSelectRoot } from "../../components/ui/native-select";
import { toaster } from "../../components/ui/toaster";

import { ConfirmationDialog } from "./components";

import { useFetchListItems } from "../../hooks/useFetchListItems";
import { useCreateItem } from "../../hooks/useCreateItem";
import { useEditItem } from "../../hooks/useEditItem";

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  userId: yup.number().required('Choose user'),
  company: yup.string().required('Choose company'),
}).required();

const AlbumForm = ({userId, id, title}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [albumTitle, setAlbumTitle] = useState(null);
  const { register, handleSubmit, control, formState: {errors}, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { 
    data: users, 
    error: usersError, 
    loading: usersLoading 
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

  const isEditMode = !!id;
  const isLoadingResponse = usersLoading || createdLoading || editedLoading;

  const onSubmit = (data) => {
    console.log(data);

    const newUserId = data.userId ? data.userId : userId;

    const newAlbum = {
      title: data.title,
      userId: newUserId,
    }

    console.log(newAlbum);

    if (isEditMode) {
      onEditItem(newAlbum, id);
    } else {
      onCreateItem(newAlbum);
    }
  };

  const companyList = users.map(item => item.company.name);

  const usersList = createListCollection({
    items: [...users],
    itemToString: (item) => item.username,
    itemToValue: (item) => item.id
  });

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
              invalid={!!errors.userId}
              errorText={errors.userId?.message}
              disabled={usersLoading || usersError}
            >
              <Controller
                control={control}
                name="userId"
                render={({field}) => (
                  <SelectRoot
                    collection={usersList}
                    name={field.name}
                    value={field.value}
                    onValueChange={({value}) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    defaultValue={isEditMode ? [userId] : []}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent>
                      {usersList.items.map((item) => (
                        <SelectItem key={item.id} item={item}>
                          {item.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
            </Field>
          </GridItem>
          <GridItem>
            <Field
              label="Company"
              invalid={!!errors.company}
              errorText={errors.company?.message}
            >
              <NativeSelectRoot>
                <NativeSelectField
                  {...register("company", {
                    // value: "Romaguera-Crona"
                    // defaultValue: "Romaguera-Crona"
                  })}
                  placeholder="Select company"
                  items={companyList}
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