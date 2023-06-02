import { SelectProps } from "@cloudscape-design/components/select";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  CHART_ALL_ENTRIES,
  CHART_FREQUENCY,
  CREATE_NEW_ENTRY,
} from "../constants";
import { TimeOption } from "../types";

interface ApplicationStore {
  addSelect: SelectProps.Option;
  setAddSelect: (option: SelectProps.Option) => void;
  chartType: SelectProps.Option;
  setChartType: (option: SelectProps.Option) => void;
  chartStat: SelectProps.Option;
  setChartStat: (option: SelectProps.Option) => void;
  chartTime: SelectProps.Option;
  setChartTime: (option: SelectProps.Option) => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  devtools(
    persist(
      (set) => ({
        addSelect: { value: CREATE_NEW_ENTRY },
        setAddSelect: (option: SelectProps.Option) => {
          set(() => ({ addSelect: option }));
        },
        chartType: { value: CHART_ALL_ENTRIES },
        setChartType: (option: SelectProps.Option) => {
          set(() => ({ chartType: option }));
        },
        chartStat: { value: CHART_FREQUENCY },
        setChartStat: (option: SelectProps.Option) => {
          set(() => ({ chartStat: option }));
        },
        chartTime: { value: TimeOption.LAST_WEEK },
        setChartTime: (option: SelectProps.Option) => {
          set(() => ({ chartTime: option }));
        },
      }),
      { name: "application-storage" }
    )
  )
);
