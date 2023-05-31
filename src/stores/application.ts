import { SelectProps } from "@cloudscape-design/components/select";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CREATE_NEW_ENTRY } from "../constants";
import { TimeOption } from "../types";

interface ApplicationStore {
  addSelect: SelectProps.Option;
  setAddSelect: (option: SelectProps.Option) => void;
  chartType: SelectProps.Option;
  setChartType: (option: SelectProps.Option) => void;
  chartTime: SelectProps.Option;
  setChartTime: (option: TimeOption) => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  devtools(
    persist(
      (set) => ({
        addSelect: {
          label: CREATE_NEW_ENTRY,
          value: CREATE_NEW_ENTRY,
        },
        setAddSelect: (option: SelectProps.Option) => {
          set(() => ({ addSelect: option }));
        },
        chartType: {
          label: TimeOption.LAST_WEEK,
          value: TimeOption.LAST_WEEK,
        },
        setChartType: (option: SelectProps.Option) => {
          set(() => ({ chartType: option }));
        },
        chartTime: {
          label: TimeOption.LAST_WEEK,
          value: TimeOption.LAST_WEEK,
        },
        setChartTime: (option: SelectProps.Option) => {
          set(() => ({ chartTime: option }));
        },
      }),
      {
        name: "application-storage",
      }
    )
  )
);
