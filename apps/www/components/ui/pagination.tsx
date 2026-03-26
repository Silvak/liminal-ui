"use client";

import * as React from "react";
import { Pagination as ArkPagination } from "@ark-ui/react/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const PaginationRoot = ArkPagination.Root;
const PaginationContext = ArkPagination.Context;

const PaginationPrevPageTrigger = React.forwardRef<
  React.ElementRef<typeof ArkPagination.PrevTrigger>,
  React.ComponentPropsWithoutRef<typeof ArkPagination.PrevTrigger>
>(({ className, ...props }, ref) => (
  <ArkPagination.PrevTrigger
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </ArkPagination.PrevTrigger>
));
PaginationPrevPageTrigger.displayName = "PaginationPrevPageTrigger";

const PaginationNextPageTrigger = React.forwardRef<
  React.ElementRef<typeof ArkPagination.NextTrigger>,
  React.ComponentPropsWithoutRef<typeof ArkPagination.NextTrigger>
>(({ className, ...props }, ref) => (
  <ArkPagination.NextTrigger
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </ArkPagination.NextTrigger>
));
PaginationNextPageTrigger.displayName = "PaginationNextPageTrigger";

const PaginationPage = React.forwardRef<
  React.ElementRef<typeof ArkPagination.Item>,
  React.ComponentPropsWithoutRef<typeof ArkPagination.Item>
>(({ className, children, ...props }, ref) => (
  <ArkPagination.Item
    ref={ref}
    className={cn(
      "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground",
      "data-selected:border-primary data-selected:bg-primary data-selected:text-primary-foreground",
      className
    )}
    {...props}
  >
    {children}
  </ArkPagination.Item>
));
PaginationPage.displayName = "PaginationPage";

interface PaginationProps extends React.ComponentPropsWithoutRef<typeof ArkPagination.Root> {}

const Pagination = React.forwardRef<
  React.ElementRef<typeof ArkPagination.Root>,
  PaginationProps
>(({ className, ...props }, ref) => (
  <PaginationRoot ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
    <PaginationPrevPageTrigger />
    <PaginationContext>
      {(pagination) =>
        pagination.pages.map((page, index) =>
          page.type === "page" ? (
            <PaginationPage
              key={`${page.value}-${index}`}
              type={page.type}
              value={page.value}
            >
              {page.value}
            </PaginationPage>
          ) : (
            <ArkPagination.Ellipsis
              key={`ellipsis-${index}`}
              index={index}
              className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </ArkPagination.Ellipsis>
          )
        )
      }
    </PaginationContext>
    <PaginationNextPageTrigger />
  </PaginationRoot>
));
Pagination.displayName = "Pagination";

export {
  Pagination,
  PaginationRoot,
  PaginationContext,
  PaginationPrevPageTrigger,
  PaginationNextPageTrigger,
  PaginationPage,
  type PaginationProps,
};
