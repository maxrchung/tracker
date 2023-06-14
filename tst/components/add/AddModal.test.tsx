import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import AddModal from "src/components/add/AddModal";
import { createQueryClient } from "src/queryClient";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import requests from "src/requests";

it("submits form", async () => {
  const user = userEvent.setup();
  vi.spyOn(requests, "listEntryNames").mockResolvedValue([]);
  vi.spyOn(requests, "createEntry").mockResolvedValue("");
  const mockDismiss = vi.fn();
  const mockReset = vi.fn();
  render(
    <QueryClientProvider client={createQueryClient()}>
      <AddModal isVisible onDismiss={mockDismiss} resetPage={mockReset} />
    </QueryClientProvider>
  );

  await user.type(
    screen.getByRole("textbox", { name: "New type" }),
    "new type"
  );
  await user.type(screen.getByRole("spinbutton", { name: "Value" }), "10");
  await user.click(screen.getByRole("button", { name: "Add" }));

  expect(mockDismiss).toBeCalledTimes(1);
  expect(mockReset).toBeCalledTimes(1);
});
