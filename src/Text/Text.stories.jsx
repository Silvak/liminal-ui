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
    as: "h1",
    children: "Hello World",
  },
};
