import type { Metadata } from "next";
import { PlaygroundClient } from "../../../components/playground/playground-client";

export const metadata: Metadata = {
  title: "Playground — Liminal UI",
  description:
    "Visualize and customize Liminal UI themes interactively. Try presets, adjust colors, border radius, and see changes live on dashboard and card layouts.",
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
