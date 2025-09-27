import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

export const FeedbackTab: React.FC = () => {
  const { toast } = useToast();

  const showToast = (type: string) => {
    switch (type) {
      case "success":
        toast.success("Success! Your action was completed successfully.");
        break;
      case "error":
        toast.error("Error: Something went wrong. Please try again.");
        break;
      case "info":
        toast.info("Information: Here's some helpful information for you.");
        break;
      default:
        toast("Default toast message");
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
          <CardDescription>
            Temporary messages to provide feedback to users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => showToast("default")}>Show Toast</Button>
            <Button onClick={() => showToast("success")} variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Success Toast
            </Button>
            <Button onClick={() => showToast("error")} variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Error Toast
            </Button>
            <Button onClick={() => showToast("info")} variant="secondary">
              <Info className="mr-2 h-4 w-4" />
              Info Toast
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Small status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loading Skeletons</CardTitle>
          <CardDescription>
            Placeholder elements shown while content is loading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Profile Card Skeleton</h4>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Text Content Skeleton</h4>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Card Skeleton</h4>
            <div className="space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Toast Usage"
        code={`import { useToast } from "@/hooks/use-toast"

function MyComponent() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}

// Error toast
toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive",
})`}
      />

      <CodeBlock
        title="Badge Usage"
        code={`import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>`}
      />

      <CodeBlock
        title="Skeleton Usage"
        code={`import { Skeleton } from "@/components/ui/skeleton"

// Profile skeleton
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

// Text skeleton
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>`}
      />
    </div>
  );
};
