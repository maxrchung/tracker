import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import LineChart from "@cloudscape-design/components/line-chart";
import Box from "@cloudscape-design/components/box";
import FormField from "@cloudscape-design/components/form-field";
import Select from "@cloudscape-design/components/select";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { TimeOption } from "../types";
import { useApplicationStore } from "../stores/application";
import { useQuery } from "@tanstack/react-query";
import requests from "../requests";
import { DEFAULT_RESULTS, REFETCH_INTERVAL } from "../constants";
import { formatChartDate, formatChartTime, formatTimeZone } from "../time";

export default function Analytics() {
  const chartType = useApplicationStore((state) => state.chartType);
  const setChartType = useApplicationStore((state) => state.setChartType);
  const chartTime = useApplicationStore((state) => state.chartTime);
  const setChartTime = useApplicationStore((state) => state.setChartTime);

  const listEntryNames = useQuery({
    queryKey: ["listEntryNamesFilter"],
    queryFn: async () => {
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
  const options = listEntryNames.data ?? [];

  const listEntriesChart = useQuery({
    queryKey: ["listEntriesChart", chartType, chartTime],
    queryFn: () => requests.listEntriesChart(chartType.value, chartTime.value),
    refetchInterval: REFETCH_INTERVAL,
  });
  const { entries, maxValue, minDate, maxDate } =
    listEntriesChart.data ?? DEFAULT_RESULTS;

  return (
    <Container header={<Header variant="h2">Analytics</Header>}>
      <SpaceBetween size="l">
        <ColumnLayout columns={2}>
          <FormField label="Type">
            <Select
              loadingText="Loading types..."
              statusType="finished"
              onChange={(event) => {
                const type = event.detail.selectedOption;
                setChartType(type);
              }}
              selectedOption={chartType}
              options={options}
              selectedAriaLabel="Selected"
              empty="No types"
            />
          </FormField>

          <FormField label="Time">
            <Select
              onChange={(event) => {
                const time = event.detail.selectedOption;
                setChartTime(time);
              }}
              selectedOption={chartTime}
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
          statusType={
            listEntryNames.isLoading || listEntriesChart.isLoading
              ? "loading"
              : "finished"
          }
          series={
            entries.length === 0
              ? []
              : [
                  {
                    title: chartType.label ?? "",
                    type: "line",
                    data: entries.map(({ createdAt, value }) => ({
                      x: new Date(createdAt),
                      y: value,
                    })),
                  },
                ]
          }
          xDomain={[minDate, maxDate]}
          yDomain={[0, maxValue]}
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
          hideLegend
          loadingText="Loading data..."
          xScaleType="time"
          xTitle={`Time ${formatTimeZone()}`}
          yTitle="Value"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No data</b>
              <Box variant="p" color="inherit">
                No data to display. Select a Type to view analytics.
              </Box>
            </Box>
          }
        />
      </SpaceBetween>
    </Container>
  );
}
