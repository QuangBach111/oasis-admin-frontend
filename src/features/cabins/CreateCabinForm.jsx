/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit, type }) {
  // TODO: check the image is changed or not
  const hasImageChange = cabinToEdit?.image?.startsWith('');

  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {}
  });

  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  // Handle submit
  function onSubmit(newCabin) {
    const formData = new FormData();
    Object.entries(newCabin).forEach(([key, value]) => {
      formData.append(key, value);
    });


    if (isEditSession) {
      if (hasImageChange) {
        // Append the image to FormData
        formData.append('image', newCabin.image[0]);
      }
      editCabin(formData);
    }
    else {
      createCabin(formData);
    }
  }

  function onError(errors) {
    console.log('errors', errors);
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
      >

        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required!",
            validate: (value) =>
              value >= 1 || "Capacity may be at least 1"
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required!"
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price"
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={null}
      >
        <Textarea type="number" id="description" {...register("description")} />
      </FormRow>

      <FormRow
        label="Cabin photo"
      >
        <FileInput
          id="image"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} >{type}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
