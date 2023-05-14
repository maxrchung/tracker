import { FlashbarProps } from "@cloudscape-design/components/flashbar";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { uid } from "uid";

interface NotificationState {
  messageDefinitions: FlashbarProps.MessageDefinition[];
  addNotification: (notification: FlashbarProps.MessageDefinition) => void;
}

const maxNotifications = 10;

export const useNotificationStore = create<NotificationState>()(
  devtools((set) => ({
    messageDefinitions: [],
    addNotification: (notification: FlashbarProps.MessageDefinition) => {
      const id = uid();

      const messageDefinition: FlashbarProps.MessageDefinition = {
        ...notification,
        id,
        dismissible: true,
        onDismiss: () => {
          set((state) => ({
            messageDefinitions: state.messageDefinitions.filter(
              (messageDefinition) => messageDefinition.id !== id
            ),
          }));
        },
      };
      set((state) => ({
        messageDefinitions: [
          messageDefinition,
          // Only take up to 10 notifications
          ...state.messageDefinitions.slice(0, maxNotifications - 1),
        ],
      }));
    },
  }))
);
