import { getRecordsByPageAction } from '@/actions/actions';
import ButtonAddNew from '@/components/ui/ButtonAddNew';
import Pagination from '@/components/ui/Pagination';
import RecordAction from '@/components/ui/RecordAction';
import UsersFilters from '@/components/user/UserFilters';
import { Endpoint, GetUsersByPageParams } from '@/types/serverSideRequest';
import React from 'react';

const UsersPage = async ({
  searchParams,
}: {
  searchParams: GetUsersByPageParams;
}) => {
  const usersData = await getRecordsByPageAction(Endpoint.Users, {
    page: searchParams.page,
    sortParam: searchParams.sortParam,
    sortDirection: searchParams.sortDirection,
    search: searchParams.search,
  });

  const { page, ...filterParams } = searchParams;

  return (
    <div>
      <UsersFilters searchParams={searchParams} />
      <div className='flex justify-end'>
        <ButtonAddNew endpoint={Endpoint.Users} />
      </div>
      <table className='min-w-full table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-center'>No</th>
            <th className='px-4 py-2 text-center'>First Name</th>
            <th className='px-4 py-2 text-center'>Last Name</th>
            <th className='px-4 py-2 text-center'>Email</th>
            <th className='px-4 py-2 text-center'>Role</th>
            <th className='px-4 py-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.data.map((user, i) => (
            <tr key={user.id}>
              <td className='border px-4 py-2 text-center'>{i + 1}</td>
              <td className='border px-4 py-2 text-center'>
                {user.first_name}
              </td>
              <td className='border px-4 py-2 text-center'>{user.last_name}</td>
              <td className='border px-4 py-2 text-center'>{user.email}</td>
              <td className='border px-4 py-2 text-center'>
                {user.role?.name}
              </td>
              <td className='border px-4 py-2 text-center'>
                <RecordAction id={user.id} endpoint={Endpoint.Users} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageAmount={Math.ceil(usersData.meta.total / usersData?.meta.per_page)}
        queryParams={filterParams}
      />
    </div>
  );
};

export default UsersPage;
