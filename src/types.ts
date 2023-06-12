import { Entry } from "./API";

export enum TimeOption {
  LAST_DAY = "Last day",
  LAST_WEEK = "Last week",
  LAST_MONTH = "Last month",
  ALL_TIME = "All time",
}
export interface ChartResults {
  entries: Entry[];
  maxValue: number;
  minDate: Date;
  maxDate: Date;
}
