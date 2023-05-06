import { FlashbarProps } from "@cloudscape-design/components/flashbar";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { uid } from "uid";

// Notification is a subset of FlashbarProps.MessageDefinition
interface Notification {
  header?: string;
  content?: string;
  type: FlashbarProps.Type;
}

interface NotificationState {
  messageDefinitions: FlashbarProps.MessageDefinition[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

const maxNotifications = 10;

export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set) => ({
        messageDefinitions: [],
        addNotification: (notification: Notification) => {
          const id = uid();

          const messageDefinition: FlashbarProps.MessageDefinition = {
            ...notification,
            id,
            dismissible: true,
          };
          set((state) => ({
            messageDefinitions: [
              messageDefinition,
              // Only take up to 10 notifications
              ...state.messageDefinitions.slice(0, maxNotifications - 1),
            ],
          }));
        },
        removeNotification: (id: string) => {
          set((state) => ({
            messageDefinitions: state.messageDefinitions.filter(
              (messageDefinition) => messageDefinition.id !== id
            ),
          }));
        },
      }),
      {
        name: "notification-storage",
      }
    )
  )
);
