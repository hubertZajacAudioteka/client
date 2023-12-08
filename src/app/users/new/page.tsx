import { getAllRecords } from '@/actions/actions';
import FormAddUser from '@/components/user/FormAddUser';
import { Endpoint } from '@/types/action';
import React from 'react';

const AddNewUserPage = async () => {
  const roles = await getAllRecords(Endpoint.Roles);
  return (
    <div className='m-auto max-w-xl'>
      <FormAddUser roles={roles} />
    </div>
  );
};

export default AddNewUserPage;
