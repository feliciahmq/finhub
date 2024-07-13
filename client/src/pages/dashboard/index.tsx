import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./row1";
import Row2 from "./row2";
import Row3 from "./row3";

const gridTemplateLarge = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`
const gridTemplateSmall = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")

  return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem" 
      sx={
        isAboveMediumScreens ? {
          gridTemplateColumns: "repeat(3, minminx(370px, 1fr))",
          gridTemplateRows: "repeat(10, minxmax(60px, 1fr))",
          gridTemplateAreas: gridTemplateLarge,
        } : {
          gridAutoColumns: "1fr",
          gridAutoRows: "80px",
          gridTemplateAreas: gridTemplateSmall,
        }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;