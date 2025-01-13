// import { useForm } from "react-hook-form";
import { Button, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import {
  DialogRoot,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogActionTrigger 
} from "../../../components/ui/dialog";

const ConfirmationDialog = ({open, setOpen, albumTitle, isEditMode, callback}) => {
  const navigate = useNavigate();
  // const { reset } = useForm();

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
              <Button onClick={() => callback()}>Create a new</Button>
            }
          </DialogActionTrigger>
          <Button variant="outline" onClick={() => { navigate('/albums') }}>Back to list</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default ConfirmationDialog;