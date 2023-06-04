import ContentLayout from "@cloudscape-design/components/content-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import LineChart from "@cloudscape-design/components/line-chart";
import Box from "@cloudscape-design/components/box";
import FormField from "@cloudscape-design/components/form-field";
import Select from "@cloudscape-design/components/select";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useState } from "react";
import { TimeOption } from "../types";
import { useApplicationStore } from "../stores/application";
import { useQuery } from "@tanstack/react-query";
import requests from "../requests";
import { CHART_ALL_ENTRIES, CHART_FREQUENCY, CHART_VALUE } from "../constants";
import { formatChartDate, formatChartTime, formatTimeZone } from "../time";

export default function Analytics() {
  const chartType = useApplicationStore((state) => state.chartType);
  const setChartType = useApplicationStore((state) => state.setChartType);
  const chartStat = useApplicationStore((state) => state.chartStat);
  const setChartStat = useApplicationStore((state) => state.setChartStat);
  const chartTime = useApplicationStore((state) => state.chartTime);
  const setChartTime = useApplicationStore((state) => state.setChartTime);

  const listEntryNames = useQuery({
    queryKey: ["listEntryNamesFilter"],
    queryFn: async () => {
      const entryNames = await requests.listEntryNames();
      if (entryNames.length === 0) {
        return [];
      }

      const options = [
        { value: CHART_ALL_ENTRIES },
        ...entryNames.map(({ name, id }) => ({ label: name, value: id })),
      ];
      return options;
    },
  });
  const options = listEntryNames.data ?? [];

  const [type, setType] = useState(chartType);
  const [stat, setStat] = useState(chartStat);
  const [time, setTime] = useState(chartTime);

  const listEntriesChart = useQuery({
    queryKey: ["listEntriesChart", type, time],
    queryFn: async () => {
      if (!type.value || !time.value) {
        return [];
      }
      return await requests.listEntriesChart(type.value, time.value);
    },
  });
  const entries = listEntriesChart.data ?? [];

  return (
    <ContentLayout header={<Header variant="h1">Analytics</Header>}>
      <Container header={<Header variant="h2">Analytics</Header>}>
        <SpaceBetween size="l">
          <ColumnLayout columns={3}>
            <FormField label="Type">
              <Select
                loadingText="Loading types..."
                statusType="finished"
                onChange={(event) => {
                  const type = event.detail.selectedOption;
                  setType(type);
                  setChartType(type);

                  if (type.value === CHART_ALL_ENTRIES) {
                    setStat({ value: CHART_FREQUENCY });
                    setChartStat({ value: CHART_FREQUENCY });
                  }
                }}
                selectedOption={type}
                options={options}
                selectedAriaLabel="Selected"
                empty="No types"
              />
            </FormField>

            <FormField label="Stat">
              <Select
                onChange={(event) => {
                  const stat = event.detail.selectedOption;
                  setStat(stat);
                  setChartStat(stat);
                }}
                selectedOption={stat}
                options={[
                  { value: CHART_FREQUENCY },
                  {
                    value: CHART_VALUE,
                    disabled: type.value !== CHART_ALL_ENTRIES,
                  },
                ]}
                selectedAriaLabel="Selected"
              />
            </FormField>

            <FormField label="Time">
              <Select
                onChange={(event) => {
                  const time = event.detail.selectedOption;
                  setTime(time);
                  setChartTime(time);
                }}
                selectedOption={time}
                options={[
                  { value: TimeOption.LAST_DAY },
                  { value: TimeOption.LAST_WEEK },
                  { value: TimeOption.LAST_MONTH },
                  { value: TimeOption.ALL_TIME },
                ]}
                selectedAriaLabel="Selected"
              />
            </FormField>
          </ColumnLayout>

          <LineChart
            statusType={listEntryNames.isLoading ? "loading" : "finished"}
            series={[
              {
                title: type.label ?? "",
                type: "line",
                data: entries.map((entry) => ({
                  x: new Date(entry.createdAt),
                  y: stat.value === CHART_FREQUENCY ? 1 : entry.value ?? 0,
                })),
              },
            ]}
            xDomain={[new Date(1601017200000), new Date(1601046000000)]}
            yDomain={[0, 500000]}
            i18nStrings={{
              filterLabel: "Filter displayed data",
              filterPlaceholder: "Filter data",
              filterSelectedAriaLabel: "selected",
              detailPopoverDismissAriaLabel: "Dismiss",
              legendAriaLabel: "Legend",
              chartAriaRoleDescription: "line chart",
              xTickFormatter: (e) =>
                [formatChartDate(e), formatChartTime(e)].join("\n"),
            }}
            ariaLabel="Single data series line chart"
            errorText="Error loading data."
            height={300}
            hideFilter
            loadingText="Loading data..."
            xScaleType="time"
            xTitle={`Time ${formatTimeZone()}`}
            yTitle={stat.label}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data</b>
                <Box variant="p" color="inherit">
                  No data to display.
                </Box>
              </Box>
            }
          />
        </SpaceBetween>
      </Container>
    </ContentLayout>
  );
}
