import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { IconButton, SxProps } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";

export interface ISimpleDropdownAction {
  value?: string | number;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
interface IProps {
  buttonStyles?: SxProps;
  children?: React.ReactNode;
  actionsList?: ISimpleDropdownAction[];
  place?: PopperPlacementType;
}

const SimpleDropdown = ({ children, actionsList, place, buttonStyles }: IProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const prevOpen = React.useRef(open);

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event?: Event | React.SyntheticEvent) => {
    if (event && anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleOnClick = React.useCallback(
    (value: string | number) => () => {
      const item = actionsList?.find((elem) => elem.value === value);
      item?.onClick?.();
      handleClose();
    },
    [actionsList],
  );

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        sx={{
          p: 0,
          bgcolor: "transparent",
          ":hover": {
            bgcolor: "transparent",
          },
          ...buttonStyles,
        }}
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {children || <DehazeIcon />}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={place}
        transition
        sx={{
          zIndex: "20",
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper
              sx={{
                borderRadius: "8px !important",
                overflow: "hidden",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {actionsList?.map((item, idx) => (
                    <MenuItem
                      onClick={handleOnClick(item.value || "")}
                      key={item.value + idx.toString()}
                      sx={{
                        display: "flex",
                        fontFamily: "Roboto",
                        fontWeight: 500,
                        color: "grey.900",
                        gap: "4px",
                        alignItems: "center",
                        fontSize: "14px",
                        "& .MuiSvgIcon-root": {
                          width: "14px",
                        },
                      }}
                    >
                      {item?.icon}
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SimpleDropdown;
