import { Alert, Typography } from "@mui/material";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { useGetUsersQuery } from "../../Store/apis/main";
import { setUsers } from "../../Store/slices/usersSlice";
import { useEffect } from "react";

const UsersList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUsersQuery("");

  useEffect(() => {
    if (data) dispatch(setUsers(data));
  }, [data, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <Typography
        variant="h4"
        component="h3"
        sx={{
          fontWeight: 500,
          fontSize: "24px",
          fontFamily: "Roboto",
          borderBottom: "1px solid #E0E0E0",
          pb: "12px",
        }}
      >
        Users List
      </Typography>
      {isLoading ? (
        <span>Loading</span>
      ) : data?.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,3fr))] gap-6 !w-full">
          {data?.map((user) => <UserCard key={user.id} data={user} />)}
        </div>
      ) : (
        <Alert severity="info">Users List is empty</Alert>
      )}
    </div>
  );
};

export default UsersList;
