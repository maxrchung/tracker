import minutesToMilliseconds from "date-fns/minutesToMilliseconds";
import { ChartResults } from "./types";

export const CREATE_NEW_ENTRY = "Create new type...";
export const SORT_KEY = "sort";
export const MAX_PAGE = 10;
export const MAX_ENTRY_TYPES = 10;
export const REFETCH_INTERVAL = minutesToMilliseconds(1);

export const DEFAULT_RESULTS: ChartResults = {
  entries: [],
  maxValue: 0,
  minDate: new Date(),
  maxDate: new Date(),
};
