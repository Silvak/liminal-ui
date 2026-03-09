"use client";

import * as React from "react";
import {
  Github,
  Chrome,
  Send,
  Star,
  Zap,
  Shield,
  Check,
  MessageSquare,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/separator";

const notificationItems = [
  {
    id: "push",
    label: "Push notifications",
    description: "Receive alerts on your device",
    defaultChecked: true,
  },
  {
    id: "email",
    label: "Email digest",
    description: "Weekly summary of activity",
    defaultChecked: true,
  },
  {
    id: "marketing",
    label: "Marketing emails",
    description: "Tips, offers and updates",
    defaultChecked: false,
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Unusual activity warnings",
    defaultChecked: true,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals",
    badge: null,
    features: ["5 projects", "10 GB storage", "Basic analytics", "Email support"],
    cta: "Get started",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams",
    badge: "Popular",
    features: ["Unlimited projects", "100 GB storage", "Advanced analytics", "Priority support", "Custom domains"],
    cta: "Start free trial",
    variant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organizations",
    badge: null,
    features: ["Everything in Pro", "1 TB storage", "Custom integrations", "Dedicated support", "SLA guarantee"],
    cta: "Contact sales",
    variant: "outline" as const,
  },
];

const teamMembers = [
  { name: "Sofia Davis", role: "Owner", email: "sofia@example.com", initials: "SD", badge: "default" as const },
  { name: "Jackson Lee", role: "Developer", email: "jackson@example.com", initials: "JL", badge: "secondary" as const },
  { name: "Isabella N.", role: "Designer", email: "isabella@example.com", initials: "IN", badge: "outline" as const },
];

const messages = [
  { from: "bot", text: "Hi! How can I help you today?" },
  { from: "user", text: "I need help with my account." },
  { from: "bot", text: "Sure! What seems to be the problem?" },
  { from: "user", text: "I can't access my dashboard." },
];

export function CardsDemo() {
  const [switchStates, setSwitchStates] = React.useState<Record<string, boolean>>(
    Object.fromEntries(notificationItems.map((n) => [n.id, n.defaultChecked]))
  );

  return (
    <div className="p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Components</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Interactive card layouts showcasing UI components.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Create Account card */}
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Chrome className="h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-demo">Email</Label>
              <Input id="email-demo" placeholder="m@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-demo">Password</Label>
              <Input id="password-demo" placeholder="••••••••" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Card>

        {/* Notifications card */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what you want to be notified about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={switchStates[item.id]}
                  onCheckedChange={(details) =>
                    setSwitchStates((prev) => ({ ...prev, [item.id]: details.checked }))
                  }
                />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Save preferences</Button>
          </CardFooter>
        </Card>

        {/* Chat card */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <Avatar fallback="S" className="h-8 w-8" />
            <div>
              <CardTitle className="text-sm">Support Chat</CardTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.from === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </CardContent>
          <Separator />
          <CardFooter className="pt-3 gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Team members card */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Invite your team to collaborate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.email} className="flex items-center gap-3">
                <Avatar fallback={member.initials} className="h-8 w-8 text-xs" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                </div>
                <Badge variant={member.badge}>{member.role}</Badge>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Invite member</Button>
          </CardFooter>
        </Card>

        {/* Pricing cards */}
        <Card className="md:col-span-2 xl:col-span-2">
          <CardHeader>
            <CardTitle>Choose your plan</CardTitle>
            <CardDescription>Select the plan that best fits your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-lg border p-4 flex flex-col gap-3 ${
                    plan.badge
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  {plan.badge && (
                    <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                      {plan.badge}
                    </Badge>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {plan.name === "Starter" && <Zap className="h-4 w-4 text-muted-foreground" />}
                      {plan.name === "Pro" && <Star className="h-4 w-4 text-primary" />}
                      {plan.name === "Enterprise" && <Shield className="h-4 w-4 text-muted-foreground" />}
                      <span className="font-semibold text-foreground text-sm">{plan.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-1.5 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.variant} size="sm" className="w-full mt-1">
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile card */}
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-3">
              <Avatar fallback="EL" className="h-16 w-16 text-lg" />
            </div>
            <CardTitle className="text-base">Ethan Lambert</CardTitle>
            <CardDescription>Senior Product Designer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge variant="secondary">UI/UX</Badge>
              <Badge variant="secondary">Figma</Badge>
              <Badge variant="secondary">React</Badge>
            </div>
            <Separator />
            <div className="grid grid-cols-3 text-center gap-2">
              <div>
                <p className="text-lg font-bold text-foreground">48</p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">12k</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">4.9</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" className="flex-1" size="sm">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Message
            </Button>
            <Button className="flex-1" size="sm">Follow</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
