import { useState } from "react";
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

import usePlaceholderService from "../../services/PlaceholderService";
import { useFetchListItems } from "../../hooks/useFetchListItems";

const AlbumForm = ({userId, id, title}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { register, handleSubmit, control, formState: {errors}, reset } = useForm();
  const { createAlbum, editAlbum } = usePlaceholderService();

  const { data } = useFetchListItems('users');

  const isEditMode = !!id;

  const onSubmit = (data) => {
    const newUserId = data.userId ? data.userId[0] : userId;

    const newAlbum = {
      title: data.title,
      userId: newUserId,
    }

    if (isEditMode) {
      editAlbum(newAlbum, id);
      setOpenDialog(true);
    } else {
      createAlbum(newAlbum);
      setOpenDialog(true);
      reset();
    }
  };

  const usersList = createListCollection({
    items: [...data],
    itemToString: (item) => item.username,
    itemToValue: (item) => item.id
  });

  const ConfirmationDialog = ({open, setOpen}) => {
    const navigate = useNavigate();
  
    return (
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} placement="center" motionPreset="slide-in-bottom">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Album" : "New Album"}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={2}>{isEditMode ? "Album edited" : "Album created."}</Text>
            <Text>
              {`Choose whether you want to ${isEditMode ? "edit current album" : "create a new album"} or return to the shared list.`}
              </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button>{isEditMode ? "Edit current" : "Create a new"}</Button>
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
              invalid={errors.title?.message}
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
              invalid={errors.userId?.message}
              errorText={errors.userId?.message}
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
      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  )
}

export default AlbumForm;