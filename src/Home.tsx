import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";

export default function Home() {
  return (
    <ContentLayout
      header={<Header variant="h1">tracker</Header>}
    ></ContentLayout>
  );
}
