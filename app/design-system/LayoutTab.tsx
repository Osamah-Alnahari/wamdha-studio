import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "./CodeBlock";
import { Star, Heart, Share } from "lucide-react";

export const LayoutTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Card Variants</CardTitle>
          <CardDescription>
            Flexible container component with different layouts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Card */}
          <div>
            <h4 className="font-semibold mb-3">Basic Card</h4>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content area of the card.</p>
              </CardContent>
            </Card>
          </div>

          {/* Card with Footer */}
          <div>
            <h4 className="font-semibold mb-3">Card with Footer</h4>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Product Card</CardTitle>
                <CardDescription>Premium subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$29/month</div>
                <p className="text-sm text-muted-foreground">
                  Access to all premium features and priority support.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe Now</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Interactive Card */}
          <div>
            <h4 className="font-semibold mb-3">Interactive Card</h4>
            <Card className="w-full max-w-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Article Title</CardTitle>
                    <CardDescription>Published 2 hours ago</CardDescription>
                  </div>
                  <Badge variant="secondary">Featured</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm">
                  This is a preview of the article content. Click to read more
                  about this interesting topic.
                </p>
              </CardContent>
              <CardFooter className="pt-3 border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-foreground">
                      <Heart className="h-4 w-4" />
                      <span>24</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-foreground">
                      <Star className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout Patterns</CardTitle>
          <CardDescription>
            Common layout structures using cards and separators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Grid Layout */}
          <div>
            <h4 className="font-semibold mb-3">Grid Layout</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">12.5K</div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">1.2K</div>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Content Sections */}
          <div>
            <h4 className="font-semibold mb-3">Content Sections</h4>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Section 1</h3>
                    <p className="text-sm text-muted-foreground">
                      This is the first section of content with some descriptive
                      text.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold">Section 2</h3>
                    <p className="text-sm text-muted-foreground">
                      This is the second section with different content and
                      information.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold">Section 3</h3>
                    <p className="text-sm text-muted-foreground">
                      Final section that concludes the content area.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Basic Card Usage"
        code={`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
      />

      <CodeBlock
        title="Grid Layout Example"
        code={`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Card>
    <CardContent className="pt-6">
      <div className="text-2xl font-bold">12.5K</div>
      <p className="text-sm text-muted-foreground">Total Users</p>
    </CardContent>
  </Card>
  <Card>
    <CardContent className="pt-6">
      <div className="text-2xl font-bold">1.2K</div>
      <p className="text-sm text-muted-foreground">Active Today</p>
    </CardContent>
  </Card>
  <Card>
    <CardContent className="pt-6">
      <div className="text-2xl font-bold">98.5%</div>
      <p className="text-sm text-muted-foreground">Uptime</p>
    </CardContent>
  </Card>
</div>`}
      />
    </div>
  );
};
