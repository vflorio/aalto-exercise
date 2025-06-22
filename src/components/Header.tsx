import { Stack } from "@mui/material";
import { Wrapper } from "./Theme";

export default function Header() {
  return (
    <Stack
      width={"100%"}
      height={94}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        backgroundColor: "secondary.main",
      }}
    >
      <Wrapper>
        <img src="/assets/logo.png" style={{ width: 140, height: 58 }} />
      </Wrapper>
    </Stack>
  );
}
