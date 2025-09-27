import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./CodeBlock";
import { Play, RotateCcw } from "lucide-react";

export const AnimationTab: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [bounceActive, setBounceActive] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Animation System</CardTitle>
          <CardDescription>
            Transitions, transforms, and animations for interactive elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Smooth animations and transitions enhance user experience and
            provide visual feedback.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transitions</CardTitle>
          <CardDescription>Smooth property changes over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 border rounded-lg transition-colors hover:bg-primary/20 cursor-pointer">
              <div className="text-sm font-mono mb-1">transition-colors</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-transform hover:scale-105 cursor-pointer">
              <div className="text-sm font-mono mb-1">hover:scale-105</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-shadow hover:shadow-lg cursor-pointer">
              <div className="text-sm font-mono mb-1">hover:shadow-lg</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-all hover:bg-primary/20 hover:scale-105 hover:shadow-md cursor-pointer">
              <div className="text-sm font-mono mb-1">transition-all</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-opacity hover:opacity-50 cursor-pointer">
              <div className="text-sm font-mono mb-1">hover:opacity-50</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-transform hover:rotate-3 cursor-pointer">
              <div className="text-sm font-mono mb-1">hover:rotate-3</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Duration & Easing</CardTitle>
          <CardDescription>Control animation timing and curves</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform duration-75 hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">duration-75</div>
                <div className="text-xs text-muted-foreground">75ms</div>
              </div>
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform duration-150 hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">duration-150</div>
                <div className="text-xs text-muted-foreground">150ms</div>
              </div>
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">duration-300</div>
                <div className="text-xs text-muted-foreground">300ms</div>
              </div>
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform duration-500 hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">duration-500</div>
                <div className="text-xs text-muted-foreground">500ms</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform ease-linear hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">ease-linear</div>
                <div className="text-xs text-muted-foreground">Linear</div>
              </div>
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform ease-in hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">ease-in</div>
                <div className="text-xs text-muted-foreground">Ease in</div>
              </div>
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform ease-out hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">ease-out</div>
                <div className="text-xs text-muted-foreground">Ease out</div>
              </div>
              <div className="p-4 bg-muted/30 border rounded-lg transition-transform ease-in-out hover:scale-105 cursor-pointer">
                <div className="text-xs font-mono mb-1">ease-in-out</div>
                <div className="text-xs text-muted-foreground">Ease in-out</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyframe Animations</CardTitle>
          <CardDescription>Built-in CSS animations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setPulseActive(!pulseActive)}
                variant="outline"
                size="sm"
              >
                <Play className="mr-2 h-4 w-4" />
                Toggle Pulse
              </Button>
              <Button
                onClick={() => setBounceActive(!bounceActive)}
                variant="outline"
                size="sm"
              >
                <Play className="mr-2 h-4 w-4" />
                Toggle Bounce
              </Button>
              <Button onClick={triggerAnimation} variant="outline" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Trigger Spin
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-16 h-16 bg-primary rounded-lg ${
                    pulseActive ? "animate-pulse" : ""
                  }`}
                ></div>
                <span className="text-xs font-mono">animate-pulse</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-16 h-16 bg-primary rounded-lg ${
                    bounceActive ? "animate-bounce" : ""
                  }`}
                ></div>
                <span className="text-xs font-mono">animate-bounce</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-16 h-16 bg-primary rounded-lg ${
                    isAnimating ? "animate-spin" : ""
                  }`}
                ></div>
                <span className="text-xs font-mono">animate-spin</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-primary rounded-lg animate-ping"></div>
                <span className="text-xs font-mono">animate-ping</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transform Examples</CardTitle>
          <CardDescription>
            Scale, rotate, translate, and skew transforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/10 border rounded-lg transition-transform hover:scale-110 cursor-pointer">
              <div className="text-xs font-mono mb-1">scale-110</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-transform hover:rotate-12 cursor-pointer">
              <div className="text-xs font-mono mb-1">rotate-12</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-transform hover:translate-x-2 cursor-pointer">
              <div className="text-xs font-mono mb-1">translate-x-2</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
            <div className="p-4 bg-primary/10 border rounded-lg transition-transform hover:skew-x-12 cursor-pointer">
              <div className="text-xs font-mono mb-1">skew-x-12</div>
              <div className="text-xs text-muted-foreground">Hover me</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CodeBlock
        title="Animation Usage"
        code={`/* Transitions */
<div className="transition-colors hover:bg-primary">
  Color transition
</div>

<div className="transition-transform hover:scale-105 duration-300 ease-in-out">
  Transform with custom timing
</div>

/* Keyframe animations */
<div className="animate-pulse">Pulsing element</div>
<div className="animate-bounce">Bouncing element</div>
<div className="animate-spin">Spinning element</div>

/* Transform utilities */
<div className="transform hover:scale-110 hover:rotate-3 transition-transform">
  Multiple transforms
</div>

/* Animation delays */
<div className="animate-bounce delay-75">Delayed animation</div>
<div className="animate-bounce delay-150">More delayed</div>`}
      />
    </div>
  );
};
