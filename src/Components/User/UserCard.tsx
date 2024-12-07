import { Card, CardContent, Typography } from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow";

import { User } from "../../Types/main";
import SimpleDropdown, { ISimpleDropdownAction } from "../UI/SimpleDropdown";
import { useNavigate } from "react-router-dom";

const UserCard = ({ data }: { data: User }) => {
  const navigate = useNavigate();

  const actions: ISimpleDropdownAction[] = [
    {
      label: "Change email",
      value: "email",
      icon: <EmailIcon />,
      onClick() {
        navigate(`/updateUser/${data.id}/email`);
      },
    },
    {
      label: "Change phone",
      value: "phone",
      icon: <LocalPhoneIcon />,
      onClick() {
        navigate(`/updateUser/${data.id}/phone`);
      },
    },
    {
      label: "Change allergies",
      value: "allergies",
      icon: <BrightnessLowIcon />,
      onClick() {
        navigate(`/updateUser/${data.id}/allergies`);
      },
    },
  ];

  return (
    <Card
      sx={{ borderRadius: "12px", position: "relative", overflow: "visible" }}
      data-testid="users-list-grid"
    >
      <CardContent
        sx={{
          p: "15px !important",
        }}
      >
        <div className="flex items-center justify-between pb-3">
          <div className="flex gap-1 items-center flex-wrap">
            <AccountCircleIcon />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                color: "grey.900",
                fontSize: 18,
                m: 0,
              }}
            >
              {data.name}
            </Typography>
          </div>
          <SimpleDropdown
            actionsList={actions}
            place="bottom-end"
            buttonStyles={{
              bgcolor: "#eee",
              px: "4px",
              borderRadius: "4px",
              ":hover": {
                bgcolor: "grey.300",
              },
            }}
          >
            <CreateIcon
              sx={{
                width: "16px",
              }}
            />
          </SimpleDropdown>
        </div>
        <div className="flex gap-1 flex-col">
          <div>
            <span className="font-semibold">Email: </span>
            <span className="font-roboto text-sm text-grey-600">{data.email}</span>
          </div>
          <div>
            <span className="font-semibold">Phone: </span>
            <span className="font-roboto text-sm text-grey-600">{data.phone}</span>
          </div>
          <div>
            <span className="font-semibold" data-testid="user-allergies-input">
              Allergies:{" "}
            </span>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(data.allergies)
                ? (data.allergies || []).map((item, idx) => (
                    <span key={item + idx} className="font-roboto text-sm text-grey-600">
                      {item},
                    </span>
                  ))
                : data.allergies}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
