import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Entries from "./Entries";

import TopNavigation from "@cloudscape-design/components/top-navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Login from "./Login";

export default function App() {
  const { signOut, user } = useAuthenticator();

  return !user ? (
    <Login />
  ) : (
    <>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <TopNavigation
          i18nStrings={{
            overflowMenuTriggerText: "More",
            overflowMenuTitleText: "All",
          }}
          identity={{
            href: "#",
            title: "tracker",
          }}
          utilities={[
            {
              type: "menu-dropdown",
              text: user?.attributes?.email ?? "",
              iconName: "user-profile",
              items: [{ id: "sign-out", text: "Sign out" }],
              onItemClick: signOut,
            },
          ]}
        />
      </div>
      <AppLayout
        content={
          <ContentLayout>
            <Entries />
          </ContentLayout>
        }
      />
    </>
  );
}
