import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ApplicationStore {
  addEntryNameId: string;
  setAddEntryNameId: (entryNameId: string) => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  devtools(
    persist(
      (set) => ({
        addEntryNameId: "",
        setAddEntryNameId: (entryNameId: string) => {
          set(() => ({
            addEntryNameId: entryNameId,
          }));
        },
      }),
      {
        name: "application-storage",
      }
    )
  )
);
