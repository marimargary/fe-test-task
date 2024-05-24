import { FC } from "react";
import { Container } from "@mui/material";
import UsersList from "../Components/User/UsersList";

const Index: FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
      }}
    >
      <UsersList />
    </Container>
  );
};

export default Index;
