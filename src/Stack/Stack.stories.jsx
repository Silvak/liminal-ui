import { Stack } from "./Stack";

const meta = {
  title: "Components/Stack",
  tags: ["autodocs"],
  component: Stack,
  parameters: { layout: "centered" },
  argTypes: {
    col: {
      type: "boolean",
      control: "boolean",
      defaultValue: false,
    },
    spacing: {
      type: "number",
      control: "number",
      defaultValue: 4,
    },
    childrenQuantity: {
      type: "number",
      control: "number",
      defaultValue: 3,
    },
  },
};

export default meta;

export const ExampleComponent = {
  render: ({ childrenQuantity, ...props }) => (
    <Stack {...props}>
      {Array.from({ length: childrenQuantity }, (_, index) => (
        <div key={index} className="bg-gray-200 p-4">
          Item {index + 1}
        </div>
      ))}
    </Stack>
  ),
};

export const Default = {
  ...ExampleComponent,
  args: {
    spacing: 4,
    col: false,
    childrenQuantity: 2,
  },
};
