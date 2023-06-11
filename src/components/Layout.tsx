import AppLayout from "@cloudscape-design/components/app-layout";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Outlet } from "react-router-dom";
import Flashbar from "@cloudscape-design/components/flashbar";
import { useNotificationStore } from "../stores/notification";

export default function Layout() {
  const messageDefinitions = useNotificationStore(
    (state) => state.messageDefinitions
  );

  const { signOut, user } = useAuthenticator();

  return (
    <>
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
      <AppLayout
        toolsHide
        headerSelector="#h"
        navigationHide
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
