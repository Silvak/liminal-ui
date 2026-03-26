"use client";

import * as React from "react";
import { FileUpload as ArkFileUpload } from "@ark-ui/react/file-upload";
import { File, Upload, X } from "lucide-react";
import { cn } from "../../lib/utils";

const FileUploadRoot = ArkFileUpload.Root;
const FileUploadHiddenInput = ArkFileUpload.HiddenInput;

const FileUploadLabel = React.forwardRef<
  React.ElementRef<typeof ArkFileUpload.Label>,
  React.ComponentPropsWithoutRef<typeof ArkFileUpload.Label>
>(({ className, ...props }, ref) => (
  <ArkFileUpload.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
FileUploadLabel.displayName = "FileUploadLabel";

const FileUploadDropzone = React.forwardRef<
  React.ElementRef<typeof ArkFileUpload.Dropzone>,
  React.ComponentPropsWithoutRef<typeof ArkFileUpload.Dropzone>
>(({ className, children, ...props }, ref) => (
  <ArkFileUpload.Dropzone
    ref={ref}
    className={cn(
      "flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input bg-muted/20 p-4 text-center",
      "data-dragging:border-primary data-dragging:bg-primary/5",
      className
    )}
    {...props}
  >
    {children}
  </ArkFileUpload.Dropzone>
));
FileUploadDropzone.displayName = "FileUploadDropzone";

const FileUploadTrigger = React.forwardRef<
  React.ElementRef<typeof ArkFileUpload.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkFileUpload.Trigger>
>(({ className, children, ...props }, ref) => (
  <ArkFileUpload.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </ArkFileUpload.Trigger>
));
FileUploadTrigger.displayName = "FileUploadTrigger";

const FileUploadItemGroup = React.forwardRef<
  React.ElementRef<typeof ArkFileUpload.ItemGroup>,
  React.ComponentPropsWithoutRef<typeof ArkFileUpload.ItemGroup>
>(({ className, ...props }, ref) => (
  <ArkFileUpload.ItemGroup
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
));
FileUploadItemGroup.displayName = "FileUploadItemGroup";

const FileUploadItem = ArkFileUpload.Item;
const FileUploadItemName = ArkFileUpload.ItemName;
const FileUploadItemSizeText = ArkFileUpload.ItemSizeText;
const FileUploadItemDeleteTrigger = ArkFileUpload.ItemDeleteTrigger;
const FileUploadClearTrigger = ArkFileUpload.ClearTrigger;

interface FileUploadProps extends React.ComponentPropsWithoutRef<typeof ArkFileUpload.Root> {
  label?: string;
  placeholder?: string;
}

const FileUpload = React.forwardRef<
  React.ElementRef<typeof ArkFileUpload.Root>,
  FileUploadProps
>(({ label, placeholder = "Drag and drop files here", className, ...props }, ref) => (
  <FileUploadRoot ref={ref} className={cn("grid gap-3", className)} {...props}>
    {label ? <FileUploadLabel>{label}</FileUploadLabel> : null}
    <FileUploadDropzone>
      <Upload className="h-5 w-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{placeholder}</p>
      <FileUploadTrigger>
        <Upload className="h-4 w-4" />
        Choose file(s)
      </FileUploadTrigger>
    </FileUploadDropzone>

    <ArkFileUpload.Context>
      {({ acceptedFiles }) =>
        acceptedFiles.length ? (
          <FileUploadItemGroup>
            {acceptedFiles.map((file) => (
              <FileUploadItem
                key={file.name}
                file={file}
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
              >
                <File className="h-4 w-4 text-muted-foreground" />
                <FileUploadItemName className="flex-1 truncate" />
                <FileUploadItemSizeText className="text-xs text-muted-foreground" />
                <FileUploadItemDeleteTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent">
                  <X className="h-4 w-4" />
                </FileUploadItemDeleteTrigger>
              </FileUploadItem>
            ))}
          </FileUploadItemGroup>
        ) : null
      }
    </ArkFileUpload.Context>
    <FileUploadHiddenInput />
  </FileUploadRoot>
));
FileUpload.displayName = "FileUpload";

export {
  FileUpload,
  FileUploadRoot,
  FileUploadLabel,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadItemGroup,
  FileUploadItem,
  FileUploadItemName,
  FileUploadItemSizeText,
  FileUploadItemDeleteTrigger,
  FileUploadHiddenInput,
  FileUploadClearTrigger,
  type FileUploadProps,
};
