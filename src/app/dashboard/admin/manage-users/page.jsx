import ManageUsersClient from "@/components/users/manage-users-client";
import { getUsers } from "@/lib/api/user";

const ManageUsersPage = async () => {
  let users = [];

  try {
    const result = await getUsers();
    users = Array.isArray(result) ? result : result.users || result.data || [];
  } catch {
    users = [];
  }

  return <ManageUsersClient initialUsers={users} />;
};

export default ManageUsersPage;
