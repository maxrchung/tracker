import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import TableView from "./TableView";

function App() {
  return (
    <AppLayout
      content={
        <ContentLayout>
          <TableView />
        </ContentLayout>
      }
    />
  );
}

export default App;
