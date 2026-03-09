"use client";

import * as React from "react";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Bell,
  Settings,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/separator";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    description: "from last month",
  },
  {
    title: "New Orders",
    value: "1,247",
    change: "-4.5%",
    trend: "down",
    icon: ShoppingCart,
    description: "from last month",
  },
  {
    title: "Growth Rate",
    value: "12.5%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
    description: "from last month",
  },
];

const transactions = [
  { id: "TXN-001", user: "Sofia Davis", email: "sofia@example.com", amount: "$316.00", status: "success", initials: "SD" },
  { id: "TXN-002", user: "Jackson Lee", email: "jackson@example.com", amount: "$242.00", status: "success", initials: "JL" },
  { id: "TXN-003", user: "Isabella N.", email: "isabella@example.com", amount: "$837.00", status: "pending", initials: "IN" },
  { id: "TXN-004", user: "Carmella W.", email: "carmella@example.com", amount: "$721.00", status: "failed", initials: "CW" },
  { id: "TXN-005", user: "Jason Park", email: "jason@example.com", amount: "$450.00", status: "processing", initials: "JP" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  success: "default",
  pending: "secondary",
  failed: "destructive",
  processing: "outline",
};

const activityItems = [
  { user: "Sofia D.", action: "placed a new order", time: "2m ago", initials: "SD" },
  { user: "Jackson L.", action: "completed payment", time: "15m ago", initials: "JL" },
  { user: "Admin", action: "deployed v2.4.1", time: "1h ago", initials: "AD" },
  { user: "Isabella N.", action: "submitted a refund", time: "3h ago", initials: "IN" },
];

export function DashboardDemo() {
  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back — here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Alert banner */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>System update scheduled</AlertTitle>
        <AlertDescription>
          Maintenance window on Sunday 2:00–4:00 AM UTC. Expect brief downtime.
        </AlertDescription>
      </Alert>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                  )}
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-xs text-primary font-medium"
                        : "text-xs text-destructive font-medium"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Transactions table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <CardDescription>Latest 5 payment activities</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                      ID
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            fallback={tx.initials}
                            className="h-7 w-7 text-xs"
                          />
                          <div>
                            <p className="font-medium text-foreground text-sm">{tx.user}</p>
                            <p className="text-xs text-muted-foreground hidden md:block">{tx.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell font-mono text-xs">
                        {tx.id}
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={statusVariant[tx.status]}>
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-foreground">
                        {tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Activity feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Latest events from your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar
                  fallback={item.initials}
                  className="h-7 w-7 text-xs shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
            <Separator />
            <Button variant="outline" size="sm" className="w-full">
              View all activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Component showcase row */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Component Showcase</CardTitle>
          <CardDescription>Buttons, badges and alerts in all variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Buttons */}
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
              Buttons
            </p>
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <Separator />

          {/* Badges */}
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
              Badges
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          <Separator />

          {/* Alerts */}
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
              Alerts
            </p>
            <div className="space-y-2">
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your changes have been saved successfully.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
