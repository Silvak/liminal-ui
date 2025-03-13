import { ArgTypes, Story } from "@storybook/blocks";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Button,
  argTypes: {
    children: {
      type: "string",
      control: "text",
      description: "Button text",
    },
    colVariant: {
      type: "string",
      control: "select",
      options: ["primary", "secondary", "warning", "danger"],
      description: "Color variant",
    },
    variant: {
      type: "string",
      control: "select",
      options: ["basic", "rounded", "pill"],
      description: "Button variant",
    },
    outline: {
      type: "boolean",
      description: "Button outline",
    },
  },
};

export default meta;

export const Primary = {
  args: {
    children: "Button",
    Story: Button,
  },
};
