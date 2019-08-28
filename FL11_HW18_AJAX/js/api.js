import fetchData  from './apiHelpers';

export const fetchUsers = () => fetchData('users', 'GET');