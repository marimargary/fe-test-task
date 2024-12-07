import { Alert, Card, Container, FormControl, FormHelperText, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import { useCallback, useState } from "react";
import { User } from "../../Types/main";

import ComboBox, { ComboBoxItem } from "../../Components/UI/ComboBox";
import { useDispatch } from "react-redux";
import {
  useUpdateEmailMutation,
  useUpdatePhoneMutation,
  useUpdateUserAllergiesMutation,
  useVerifyUpdateEmailMutation,
  useVerifyUpdatePhoneMutation,
} from "../../Store/apis/user";
import { useGetAllergiesQuery, useGetUsersQuery } from "../../Store/apis/main";
import { addToast } from "../../Store/slices/toastsSlice";

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    return "This field is required";
  }
  return !emailRegex.test(value) ? "Invalid email format" : "";
};

export type UserFormSchema = Pick<User, "email" | "allergies" | "phone">;

const UpdateUser = () => {
  const { action, id } = useParams();
  const dispatch = useDispatch();

  const [updatePhone, { isLoading: phoneLoading }] = useUpdatePhoneMutation();
  const [updateEmail, { isLoading: phoneVerLoading }] = useUpdateEmailMutation();
  const [verifyUpdateEmail, { isLoading: emailLoading }] = useVerifyUpdateEmailMutation();
  const [verifyUpdatePhone, { isLoading: emailVerLoading }] = useVerifyUpdatePhoneMutation();
  const [updateUserAllergies, { isLoading: allergiesLoading }] = useUpdateUserAllergiesMutation();

  const loading =
    phoneLoading || phoneVerLoading || emailLoading || emailVerLoading || allergiesLoading;

  const {
    data: user,
    isError,
    refetch,
  } = useGetUsersQuery("", {
    selectFromResult: (data) => ({
      ...data,
      data: data.data?.find((user) => user.id === +(id || 0)) ?? null,
    }),
  });
  const navigate = useNavigate();

  const handleSave = useCallback(
    async (value: string | string[]) => {
      let message = "";
      try {
        if (id) {
          if (action === "email") {
            const res = await updateEmail({
              email: value.toString(),
              id: +id,
            });
            if (res.data?.verificationCode) {
              await verifyUpdateEmail({
                email: value.toString(),
                verificationCode: res.data?.verificationCode,
                id: +id,
              });
              message = "User email updated successfully!";
            }
          } else if (action === "phone") {
            const res = await updatePhone({
              phone: value.toString(),
              id: +id,
            });
            if (res.data?.verificationCode) {
              await verifyUpdatePhone({
                phone: value.toString(),
                verificationCode: res.data?.verificationCode,
                id: +id,
              });
              message = "User phone updated successfully!";
            }
          } else if (action === "allergies") {
            if (Array.isArray(value)) {
              const res = await updateUserAllergies({
                id: +id,
                allergies: value,
              });
              message = res.data?.message || "";
            }
          }
          refetch();
          navigate("/");
          dispatch(
            addToast({
              info: "success",
              variant: "filled",
              message,
            }),
          );
        }
      } catch (error) {
        dispatch(
          addToast({
            info: "success",
            variant: "filled",
            message: "Something went wrong!",
          }),
        );
      }
    },
    [
      action,
      id,
      refetch,
      updateEmail,
      verifyUpdateEmail,
      updatePhone,
      verifyUpdatePhone,
      dispatch,
      updateUserAllergies,
      navigate,
    ],
  );

  return (
    <>
      <Container
        sx={{
          pt: 3,
        }}
      >
        {isError ? (
          <Alert variant="standard" severity="error">
            User not fund
          </Alert>
        ) : (
          <Card
            sx={{
              p: 3,
              borderRadius: "16px",
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: 500,
                fontSize: "24px",
                fontFamily: "Roboto",
                textTransform: "capitalize",
                pb: "14px",
              }}
            >
              Update User {action}
            </Typography>
            <Action
              action={action || ""}
              key={(user?.[action as keyof User] || "").toString()}
              value={user?.[action as keyof User] || ""}
              onSave={handleSave}
              loading={loading}
            />
          </Card>
        )}
      </Container>
    </>
  );
};

const Action = ({
  action,
  value,
  loading,
  onSave,
}: {
  action: string;
  value: string | string[] | number;
  loading: boolean;
  onSave?: (val: string | string[]) => void;
}) => {
  const [initialValue, setInitialValue] = useState<string>(value.toString());
  const [error, setError] = useState<string>("");
  const [selectedAllergies, setSelectedAllergies] = useState<ComboBoxItem[]>(
    Array.isArray(value) ? value.map((item) => ({ label: item, value: item })) : [],
  );

  const { data: allergies } = useGetAllergiesQuery("", {
    selectFromResult(data) {
      return {
        ...data,
        data: (data?.data || []).map((item) => ({
          value: item,
          label: item,
        })),
      };
    },
    skip: action !== "allergies",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValue(e.target.value);
  };

  const handleSave = () => {
    if (action === "email") {
      const error = validateEmail(initialValue);
      setError(error);
      if (!error) {
        onSave?.(initialValue.toString());
      }
    } else if (action === "phone") {
      const error = initialValue ? "" : "This field is required";
      setError(error);
      if (!error) {
        onSave?.(initialValue.toString());
      }
    } else {
      onSave?.(selectedAllergies.map((item) => item.value));
    }
  };
  const onAllergiesChange = useCallback((data: ComboBoxItem[]) => {
    setSelectedAllergies(data.map((item) => item));
  }, []);

  return (
    <>
      <FormControl
        data-testid="user-allergies-input"
        error={!!error}
        variant="standard"
        sx={{
          width: "100%",
        }}
      >
        {action !== "allergies" ? (
          <Input
            value={initialValue}
            onInput={handleChange}
            error={!!error}
            data-testid={"user-" + action + "-input"}
          />
        ) : (
          <ComboBox
            options={allergies}
            placeholder="Allergies"
            defaultSelectedItems={selectedAllergies}
            onSelectionChange={onAllergiesChange}
          />
        )}
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>

      <div className="flex justify-end flex-wrap gap-6 pt-4 mt-6 border-t-1 border-[#E0E0E0] w-full">
        <Button onClick={handleSave} disabled={loading} data-testid="save-button">
          Save
        </Button>
      </div>
    </>
  );
};

export default UpdateUser;
