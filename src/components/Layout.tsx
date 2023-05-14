import AppLayout from "@cloudscape-design/components/app-layout";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import Flashbar from "@cloudscape-design/components/flashbar";
import { useNotificationStore } from "../stores/notification";

export default function Layout() {
  const messageDefinitions = useNotificationStore(
    (state) => state.messageDefinitions
  );

  const { signOut, user } = useAuthenticator();
  const location = useLocation();

  const matches = useMatches();
  const breadcrumbs =
    location.pathname === "/"
      ? []
      : matches
          .filter((match) => match.handle as any)
          .map((match) => ({
            text: (match.handle as any).crumb,
            href: match.pathname,
          }));

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
              text: user?.attributes?.email.split("@")[0] ?? "",
              iconName: "user-profile",
              description: user?.attributes?.email ?? "",
              items: [
                {
                  id: "sign-out",
                  text: "Sign out",
                },
              ],
              onItemClick: signOut,
            },
          ]}
        />
      </div>
      <AppLayout
        toolsHide
        headerSelector="#h"
        breadcrumbs={
          <BreadcrumbGroup items={breadcrumbs} ariaLabel="Breadcrumbs" />
        }
        navigation={
          <SideNavigation
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
        notifications={
          <Flashbar
            i18nStrings={{
              ariaLabel: "Notifications",
              notificationBarAriaLabel: "View all notifications",
              notificationBarText: "Notifications",
              errorIconAriaLabel: "Error",
              warningIconAriaLabel: "Warning",
              successIconAriaLabel: "Success",
              infoIconAriaLabel: "Info",
              inProgressIconAriaLabel: "In progress",
            }}
            items={messageDefinitions}
            stackItems
          />
        }
        stickyNotifications
        content={<Outlet />}
      />
    </>
  );
}
