import { SelectProps } from "@cloudscape-design/components/select";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CREATE_NEW_ENTRY } from "../constants";

interface ApplicationStore {
  addEntrySelect: SelectProps.Option;
  setAddEntrySelect: (entrySelect: SelectProps.Option) => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  devtools(
    persist(
      (set) => ({
        addEntrySelect: {
          label: CREATE_NEW_ENTRY,
          value: CREATE_NEW_ENTRY,
        },
        setAddEntrySelect: (entrySelect: SelectProps.Option) => {
          set(() => ({
            addEntrySelect: entrySelect,
          }));
        },
      }),
      {
        name: "application-storage",
      }
    )
  )
);
