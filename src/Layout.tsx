import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavigation from "@cloudscape-design/components/side-navigation";

export default function Layout() {
  const { signOut, user } = useAuthenticator();
  const location = useLocation();
  return (
    <>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <TopNavigation
          i18nStrings={{
            overflowMenuTriggerText: "More",
            overflowMenuTitleText: "All",
          }}
          identity={{
            href: "/",
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
        navigation={
          <SideNavigation
            header={{
              href: "/",
              text: "tracker",
            }}
            activeHref={location.pathname}
            items={[
              {
                type: "link",
                text: "Entries",
                href: "/entries",
              },
              {
                type: "link",
                text: "Analytics",
                href: "/analytics",
              },
            ]}
          />
        }
        content={
          <ContentLayout>
            <Outlet />
          </ContentLayout>
        }
      />
    </>
  );
}
