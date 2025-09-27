"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ColorsTab } from "./ColorsTab";
import { TypographyTab } from "./TypographyTab";
import { FormsTab } from "./FormsTab";
import { ButtonsTab } from "./ButtonsTab";
import { InputsTab } from "./InputsTab";
import { DialogsTab } from "./DialogsTab";
import { NavigationTab } from "./NavigationTab";
import { FeedbackTab } from "./FeedbackTab";
import { LayoutTab } from "./LayoutTab";
import { SpacingTab } from "./SpacingTab";
import { BorderTab } from "./BorderTab";
import { ShadowTab } from "./ShadowTab";
import { AnimationTab } from "./AnimationTab";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState("buttons");

  const tabs = [
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "dialogs", label: "Dialogs" },
    { id: "navigation", label: "Navigation" },
    { id: "feedback", label: "Feedback" },
    { id: "layout", label: "Layout" },
    { id: "spacing", label: "Spacing" },
    { id: "borders", label: "Borders" },
    { id: "shadows", label: "Shadows" },
    { id: "animations", label: "Animations" },
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "forms", label: "Forms" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "buttons":
        return <ButtonsTab />;
      case "inputs":
        return <InputsTab />;
      case "dialogs":
        return <DialogsTab />;
      case "navigation":
        return <NavigationTab />;
      case "feedback":
        return <FeedbackTab />;
      case "layout":
        return <LayoutTab />;
      case "spacing":
        return <SpacingTab />;
      case "borders":
        return <BorderTab />;
      case "shadows":
        return <ShadowTab />;
      case "animations":
        return <AnimationTab />;
      case "colors":
        return <ColorsTab />;
      case "typography":
        return <TypographyTab />;
      case "forms":
        return <FormsTab />;
      default:
        return <ButtonsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Design System
          </h1>
  
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
