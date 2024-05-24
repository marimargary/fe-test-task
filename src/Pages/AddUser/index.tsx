import { FC, useCallback } from "react";
import UserForm, { UserFormSchema } from "../../Components/User/UserForm";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAddUserMutation } from "../../Store/apis/user";
import { useGetUsersQuery } from "../../Store/apis/main";
import { useNavigate } from "react-router-dom";
import { addToast } from "../../Store/slices/toastsSlice";

const AddUser: FC = () => {
  const dispatch = useDispatch();
  const [addUser] = useAddUserMutation();
  const { refetch } = useGetUsersQuery("");

  const navigate = useNavigate();

  const handleSubmitg = useCallback(
    async (data: UserFormSchema) => {
      try {
        await addUser({
          data,
        });
        dispatch(
          addToast({
            info: "success",
            variant: "filled",
            message: "User created successfully!",
          }),
        );
        refetch();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        dispatch(
          addToast({
            info: "error",
            variant: "filled",
            message: "Error creatign user!",
          }),
        );
        console.error("User req Error:", error);
      }
    },
    [dispatch, refetch, addUser, navigate],
  );

  return (
    <Container
      sx={{
        padding: "20px 0 0",
      }}
    >
      <UserForm onSubmit={handleSubmitg} />
    </Container>
  );
};

export default AddUser;
