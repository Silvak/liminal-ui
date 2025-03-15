import { Text } from "./Text";

const meta = {
  title: "Components/Text",
  tags: ["autodocs"],
  component: Text,
  parameters: { layout: "centered" },
  argTypes: {},
};

export default meta;

export const Default = {
  args: {
    as: "p",
    children: "Hello World",
  },
};
