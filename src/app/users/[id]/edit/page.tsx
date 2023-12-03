import { getAllRecords, getRecordById } from '@/actions/actions';
import FormEditUser from '@/components/user/FormEditUser';
import { Endpoint } from '@/types/serverSideRequest';
import React from 'react';

const UserEditPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const rolesPromise = getAllRecords(Endpoint.Roles);
  const userPromise = getRecordById(Endpoint.Users, params.id);

  const [roles, user] = await Promise.all([rolesPromise, userPromise]);
  return (
    <div className='m-auto max-w-xl'>
      <FormEditUser roles={roles} user={user} />
    </div>
  );
};

export default UserEditPage;
