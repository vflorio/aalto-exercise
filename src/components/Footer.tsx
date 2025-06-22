import { Stack } from "@mui/material";
import { Wrapper } from "./Theme";

export default function Footer() {
  return (
    <Stack
      sx={{
        mt: 2,
        width: "100%",
        backgroundColor: "primary.main",
        color: "white",
        height: 186,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Wrapper>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </Wrapper>
    </Stack>
  );
}
