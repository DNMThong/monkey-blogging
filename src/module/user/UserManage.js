import { useAuth } from "contexts/auth-context";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { userRole } from "utils/constants";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth()
  if(userInfo.role!== userRole.ADMIN) return;
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
