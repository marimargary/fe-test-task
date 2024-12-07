import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../Types/main";
import { FormControl, FormHelperText, Typography, debounce } from "@mui/material";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ComboBox, { ComboBoxItem } from "../UI/ComboBox";
import { useCallback, useState } from "react";
import { useGetAllergiesQuery } from "../../Store/apis/main";

export type UserFormSchema = Pick<User, "email" | "name" | "allergies" | "phone">;
const inintialData: UserFormSchema = {
  name: "",
  email: "",
  phone: "",
  allergies: [],
};

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    return "This field is required";
  }
  return emailRegex.test(value) || "Invalid email format";
};

const UserForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (data: UserFormSchema) => void;
  loading: boolean;
}) => {
  const [formData, setFormData] = useState(inintialData);
  const [allergiesSearch, setAllergiesSearch] = useState("");

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    values: formData,
  });

  const { data: allergies, isLoading } = useGetAllergiesQuery(allergiesSearch, {
    selectFromResult(data) {
      return {
        ...data,
        data: (data?.data || []).map((item) => ({
          value: item,
          label: item,
        })),
      };
    },
  });

  const submitForm: SubmitHandler<UserFormSchema> = (data) => {
    onSubmit({ ...data, allergies: selectedAllergies });
    setFormData(inintialData);
    setSelectedAllergies([]);
  };

  const onAllergiesChange = useCallback((data: ComboBoxItem[]) => {
    setSelectedAllergies(data.map((item) => item.value));
  }, []);

  const handleSearchAllergies = debounce((value: string) => setAllergiesSearch(value), 500);

  const onFormChange = useCallback((key: keyof UserFormSchema, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full rounded-xl p-4 border-1 border-[#d0d0d0] flex flex-col gap-3 shadow-form"
      >
        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            fontFamily: "Roboto",
          }}
          data-testid="create-new-user-title"
        >
          Create User
        </Typography>

        <FormControl error={!!errors.name} variant="standard">
          <Input
            {...register("name", {
              required: true,
              onChange(event) {
                onFormChange("name", event.target.value);
              },
            })}
            sx={{
              width: "100%",
            }}
            placeholder="Enter User Name"
            error={!!errors.name}
            data-testid="user-name-input"
          />
          {!!errors.name && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.email} variant="standard">
          <Input
            {...register("email", {
              validate: validateEmail,
              onChange(event) {
                onFormChange("email", event.target.value);
              },
            })}
            sx={{
              width: "100%",
            }}
            placeholder="Enter Email"
            error={!!errors.email}
            data-testid="user-email-input"
          />
          {!!errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
        </FormControl>

        <FormControl error={!!errors.phone} variant="standard">
          <Input
            {...register("phone", {
              required: true,
              onChange(event) {
                onFormChange("phone", event.target.value);
              },
            })}
            sx={{
              width: "100%",
            }}
            placeholder="Enter Phone Number"
            error={!!errors.phone}
            data-testid="user-phone-input"
          />
          {!!errors.phone && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>

        <FormControl
          error={!!errors.allergies}
          variant="standard"
          data-testid="allergies-form-control"
        >
          <ComboBox
            options={allergies}
            defaultSelectedItems={selectedAllergies.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder="Allergies"
            onSelectionChange={onAllergiesChange}
            loading={isLoading}
            onSearch={handleSearchAllergies}
            searchValue={allergiesSearch}
          />
        </FormControl>

        <div className="flex justify-end flex-wrap gap-6 pt-4 mt-2 border-t-1 border-[#E0E0E0] w-full ">
          <Button type="submit" disabled={loading} data-testid="save-button">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
