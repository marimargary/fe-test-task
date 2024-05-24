import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "./UI/Button";

const Header = () => {
  return (
    <div className="bg-main">
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 0",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <Typography
            variant="h4"
            component="h3"
            sx={{
              fontWeight: 500,
              fontSize: "24px",
              fontFamily: "Roboto",
              color: "white",
            }}
          >
            COOL LOGO
          </Typography>
        </Link>
        <Link to="/addUser">
          <Button theme="light">Add User</Button>
        </Link>
      </Container>
    </div>
  );
};

export default Header;
