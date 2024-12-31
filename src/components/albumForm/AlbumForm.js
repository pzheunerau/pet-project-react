import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input, Grid, GridItem, Stack, Text, createListCollection } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import {
  DialogRoot,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogActionTrigger 
} from "../../components/ui/dialog";
import { toaster } from "../../components/ui/toaster";

import { useFetchListItems } from "../../hooks/useFetchListItems";
import { useCreateItem } from "../../hooks/useCreateItem";
import { useEditItem } from "../../hooks/useEditItem";

const AlbumForm = ({userId, id, title}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [albumTitle, setAlbumTitle] = useState(null);
  const { register, handleSubmit, control, formState: {errors}, reset } = useForm();

  const { data: users, error: usersError } = useFetchListItems('users');
  const { request: onCreateItem, error: createdError } = useCreateItem();
  const { request: onEditItem, error: editedError } = useEditItem();

  useEffect(() => {
    if (usersError) {
      toaster.create({
        title: "Cannot get users",
        description: "Try again later",
        type: "error"
      })
    }

    if (createdError) {
      toaster.create({
        title: "No album created",
        description: "Try again",
        type: "error"
      })
    }

    if (editedError) {
      toaster.create({
        title: "No album edited",
        description: "Try again",
        type: "error"
      })
    }
  }, [usersError, createdError, editedError]);

  const isEditMode = !!id;

  const onSubmit = (data) => {
    const newUserId = data.userId ? data.userId[0] : userId;

    const newAlbum = {
      title: data.title,
      userId: newUserId,
    }

    console.log(newAlbum);

    if (isEditMode) {
      onEditItem(newAlbum, id)
        .then(setAlbumTitle(data.title))
        .then(setOpenDialog(true));
    } else {
      onCreateItem(newAlbum)
        .then(setAlbumTitle(data.title))
        .then(setOpenDialog(true));
    }
  };

  const usersList = createListCollection({
    items: [...users],
    itemToString: (item) => item.username,
    itemToValue: (item) => item.id
  });

  const ConfirmationDialog = ({open, setOpen, albumTitle}) => {
    const navigate = useNavigate();
  
    return (
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} placement="center" motionPreset="slide-in-bottom">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {albumTitle}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={2}>{isEditMode ? "Album edited" : "Album created"}</Text>
            <Text>
              {`Choose whether you want to ${isEditMode ? "edit current album" : "create a new album"} or return to the shared list.`}
              </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              {isEditMode ? 
                <Button>Edit current</Button>
              : 
                <Button onClick={() => reset()}>Create a new</Button>
              }
            </DialogActionTrigger>
            <Button variant="outline" onClick={() => { navigate('/albums') }}>Back to list</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    )
  }

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
              disabled={usersError}
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
                    defaultValue={[userId]}
                  >
                    <SelectTrigger>
                      <SelectValueText />
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
          <GridItem colSpan="2">
            <Stack direction="row" gap="2">
              <Button type="submit">Submit</Button>
              <Button type="reset">Cancel</Button>
            </Stack>
          </GridItem>
        </Grid>
      </form>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        albumTitle={albumTitle} 
      />
    </>
  )
}

export default AlbumForm;