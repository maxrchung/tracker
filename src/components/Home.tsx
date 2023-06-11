import Entries from "./Entries";
import Analytics from "./Analytics";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from "@cloudscape-design/components/box";

export default function Home() {
  return (
    <Box padding={{ top: "s" }}>
      <SpaceBetween direction="vertical" size="l">
        <Entries />
        <Analytics />
      </SpaceBetween>
    </Box>
  );
}
