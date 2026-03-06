"use client";

import { Toaster, toast } from "../ui/sonner";
import { Button } from "../ui/button";

export function SonnerDemo() {
  return (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast("Settings saved", {
            description: "Your preferences have been updated.",
          })
        }
      >
        Show toast
      </Button>
    </>
  );
}

export function SonnerDemoSimple() {
  return (
    <>
      <Toaster />
      <Button onClick={() => toast("Hello!")}>Show toast</Button>
    </>
  );
}

export function SonnerDemoDescription() {
  return (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast("Update ready", {
            description: "Restart the app to apply changes.",
          })
        }
      >
        Show toast
      </Button>
    </>
  );
}

export function SonnerDemoVariants() {
  return (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Saved!")}>Success</Button>
        <Button onClick={() => toast.error("Something failed")}>Error</Button>
      </div>
    </>
  );
}
