/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';

import { useSettings } from "./useSettings";
import { useEditSetting } from "./useEditSettings";
import Input from '../../ui/Input';
import { useState } from 'react';


function UpdateSettingsForm() {
  const { isSetting, setting } = useSettings();


  const { editSetting } = useEditSetting();


  if (isSetting) return <Spinner />;

  function handleUpdate(e) {
    const { name, value } = e.target;
    console.log(name);

    if (!value) return;
    if (Number(value) === setting[name]) return;

    editSetting({ ...setting, [name]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          defaultValue={setting.minBookingLength} type='number'
          id='min-nights'
          onBlur={handleUpdate}
          name='minBookingLength'
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          defaultValue={setting.maxBookingLength} type='number'
          id='max-nights'
          onBlur={handleUpdate}
          name='maxBookingLength'
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          defaultValue={setting.maxGuestsPerBooking} type='number'
          id='max-guests'
          name='maxGuestsPerBooking'
          onBlur={handleUpdate}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          defaultValue={setting.breakfastPrice}
          type='number'
          id='breakfast-price'
          name='breakfastPrice'
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
