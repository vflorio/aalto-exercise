import { Input, Stack } from "@mui/material";
import { useFilters } from "../../context/Filters";
import { useEffect, useState } from "react";
import { SearchRounded } from "@mui/icons-material";

export default function Search() {
  const { setTitle, title } = useFilters();

  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitle(value);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  useEffect(() => {
    if (!title) setValue("");
  }, [title]);

  return (
    <Stack
      direction={"row"}
      border={"1px solid"}
      borderColor={"secondary.main"}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        width={50}
        height={50}
        minWidth={50}
        backgroundColor={"secondary.main"}
        color={"white"}
      >
        <SearchRounded fontSize="large" />
      </Stack>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search..."
        disableUnderline
        sx={{
          color: "secondary.main",
          backgroundColor: "white",
          px: 1,
          flexGrow: 1,
          "& ::placeholder": {
            fontStyle: "italic",
            opacity: 1,
          },
        }}
      />
    </Stack>
  );
}
