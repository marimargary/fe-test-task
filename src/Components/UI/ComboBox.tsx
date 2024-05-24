import { SyntheticEvent, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Chip, CircularProgress } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type ComboBoxItem = {
  value: string;
  label: string;
};

type Props = {
  options?: ComboBoxItem[];
  placeholder?: string;
  defaultSelectedItems?: ComboBoxItem[];
  loading?: boolean;
  searchValue?: string;
  onSelectionChange?: (selectedItems: ComboBoxItem[]) => void;
  onSearch?: (valule: string) => void;
};

const ComboBox = ({
  options = [],
  placeholder,
  defaultSelectedItems = [],
  loading,
  searchValue = "",
  onSelectionChange,
  onSearch,
}: Props) => {
  const [inputValue, setInputValue] = useState(searchValue);
  const [selectedItems, setSelectedItems] = useState<ComboBoxItem[]>(defaultSelectedItems || []);

  const handleSelectionChange = (_: SyntheticEvent<Element, Event>, value: ComboBoxItem[]) => {
    setSelectedItems(value);
    if (onSelectionChange) {
      onSelectionChange(value);
    }
  };

  const debouncedInputChange = (value: string) => {
    setInputValue(value);
    onSearch?.(value);
  };
  useEffect(() => {
    setSelectedItems(defaultSelectedItems || []);
  }, [defaultSelectedItems]);

  return (
    <Autocomplete
      multiple
      sx={{
        width: "100%",
      }}
      options={loading ? [] : options}
      disableCloseOnSelect
      value={selectedItems}
      clearOnBlur={false}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={handleSelectionChange}
      loading={loading}
      inputValue={inputValue}
      inputMode="search"
      onInputChange={(_, newInputValue) => debouncedInputChange(newInputValue)}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.value}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip {...getTagProps({ index })} key={option.value} label={option.label} />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          placeholder="Favorites"
          value={inputValue}
          InputProps={{
            ...params.InputProps,
            value: inputValue,

            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& label": {
              bgcolor: "#F9F9F9",
              color: "#B7B7B7",
            },
            "& .MuiOutlinedInput-root": {
              bgcolor: "#f9f9f9",
              borderRadius: "8px",
              outline: "none",
              borderColor: "#E0E0E0",
              overflow: "hidden",
              padding: "8px 14px",
              fontFamily: "Roboto",
              border: "1px solid #D0D5DD",

              "&.Mui-focused": {
                borderColor: "primary.main",
              },

              "& .MuiInputBase-input:placeholder": {
                color: "red",
              },
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
      )}
    />
  );
};

export default ComboBox;
