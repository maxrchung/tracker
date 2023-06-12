import Entries from "./Entries";
import Analytics from "./Analytics";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from "@cloudscape-design/components/box";
import requests from "../requests";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  useQuery({
    queryKey: ["listEntryNamesFilter2222"],
    queryFn: async () => {
      console.log("rerunning top level home");
      const entryNames = await requests.listEntryNames();
      if (entryNames.length === 0) {
        return [];
      }

      const options = entryNames.map(({ name, id }) => ({
        label: name,
        value: id,
      }));
      return options;
    },
  });

  return (
    <Box padding={{ top: "s" }}>
      <SpaceBetween direction="vertical" size="l">
        <Entries />
        <Analytics />
      </SpaceBetween>
    </Box>
  );
}
