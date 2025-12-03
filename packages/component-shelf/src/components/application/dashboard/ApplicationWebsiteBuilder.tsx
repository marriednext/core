"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Palette,
  ImageIcon,
  Layout,
  Eye,
  ExternalLink,
  Save,
  Undo,
  Smartphone,
  Monitor,
  Upload,
  Check,
  LayoutTemplate,
  RotateCcw,
  Copy,
  PanelLeftClose,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LisasTheme } from "../../theme/lisastheme/LisasTheme";

const colorPresets = [
  {
    name: "Sage & Cream",
    primary: "#6B7B5F",
    secondary: "#FAF9F6",
    accent: "#D4A574",
  },
  {
    name: "Blush & Gold",
    primary: "#D4A5A5",
    secondary: "#FFF9F5",
    accent: "#C9A962",
  },
  {
    name: "Navy & Silver",
    primary: "#2C3E50",
    secondary: "#F8F9FA",
    accent: "#A8A9AD",
  },
  {
    name: "Terracotta",
    primary: "#C17767",
    secondary: "#FBF7F4",
    accent: "#8B7355",
  },
  {
    name: "Lavender",
    primary: "#9B8AA5",
    secondary: "#FAF8FC",
    accent: "#C9B8D4",
  },
  {
    name: "Forest",
    primary: "#3D5A47",
    secondary: "#F5F7F4",
    accent: "#8B9D77",
  },
];

const fontOptions = [
  { value: "playfair", label: "Playfair Display", style: "font-serif" },
  { value: "cormorant", label: "Cormorant Garamond", style: "font-serif" },
  { value: "dm-sans", label: "DM Sans", style: "font-sans" },
  { value: "inter", label: "Inter", style: "font-sans" },
  { value: "lora", label: "Lora", style: "font-serif" },
];

type WebsiteContent = {
  coupleNames: string;
  weddingDate: string;
  venue: string;
  venueAddress: string;
  welcomeMessage: string;
  heroImage: string;
  galleryImages: string[];
};

type WebsiteStyles = {
  headingFont: string;
  bodyFont: string;
  colorPreset: number;
};

export type WebsiteBuilderData = {
  fieldNameA: string | null;
  fieldNameB: string | null;
  fieldLocationName: string | null;
  fieldLocationAddress: string | null;
  fieldEventDate: string | null;
  fieldEventTime: string | null;
  fieldMapsShareUrl: string | null;
};

export type ApplicationWebsiteBuilderProps = {
  data?: WebsiteBuilderData;
  isLoading?: boolean;
};

export function ApplicationWebsiteBuilder({
  data,
  isLoading = false,
}: ApplicationWebsiteBuilderProps) {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [hasChanges, setHasChanges] = useState(false);
  const currentTemplate = "Lisa's Theme";
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("images");

  const defaultContent: WebsiteContent = {
    coupleNames: "Sarah & Michael",
    weddingDate: "June 15, 2025",
    venue: "Rosewood Garden Estate",
    venueAddress: "1234 Garden Lane, Napa Valley, CA",
    welcomeMessage:
      "We are so excited to celebrate our special day with you. Join us for an evening of love, laughter, and dancing under the stars.",
    heroImage: "/elegant-wedding-website-preview-with-couple-photo.jpg",
    galleryImages: [],
  };

  const defaultStyles: WebsiteStyles = {
    headingFont: "playfair",
    bodyFont: "dm-sans",
    colorPreset: 0,
  };

  const [content, setContent] = useState<WebsiteContent>({
    coupleNames: "Sarah & Michael",
    weddingDate: "June 15, 2025",
    venue: "Rosewood Garden Estate",
    venueAddress: "1234 Garden Lane, Napa Valley, CA",
    welcomeMessage:
      "We are so excited to celebrate our special day with you. Join us for an evening of love, laughter, and dancing under the stars.",
    heroImage:
      "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/cody-chan-7jgtAhJkjwk-unsplash.jpghttps://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/cody-chan-7jgtAhJkjwk-unsplash.jpg",
    galleryImages: [],
  });

  const [styles, setStyles] = useState<WebsiteStyles>({
    headingFont: "playfair",
    bodyFont: "dm-sans",
    colorPreset: 0,
  });

  const handleReset = () => {
    setContent(defaultContent);
    setStyles(defaultStyles);
    setHasChanges(false);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText("marriednext.com/sarah-michael");
  };

  const updateStyles = (key: keyof WebsiteStyles, value: string | number) => {
    setStyles((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleCollapsedTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsPanelCollapsed(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">
            Website Builder
          </h1>
          <p className="text-muted-foreground mt-1">
            Customize your wedding website
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" disabled={!hasChanges}>
            <Undo className="h-4 w-4 mr-2" />
            Undo
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Builder Layout */}
      <div className="flex gap-6 transition-all duration-300">
        {/* Left Panel - Editor */}
        {isPanelCollapsed ? (
          /* Collapsed state - just show icon buttons to expand */
          <div className="flex flex-col items-center gap-1 py-1 px-1 bg-card border border-border rounded-lg shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsPanelCollapsed(false)}
              title="Show editor panel"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="w-full h-px bg-border my-1" />
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                activeTab === "images"
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground"
              }`}
              title="Images"
              onClick={() => handleCollapsedTabClick("images")}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                activeTab === "style"
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground"
              }`}
              title="Style"
              onClick={() => handleCollapsedTabClick("style")}
            >
              <Palette className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                activeTab === "layout"
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground"
              }`}
              title="Layout"
              onClick={() => handleCollapsedTabClick("layout")}
            >
              <Layout className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          /* Expanded state - full editor panel */
          <div className="w-[380px] shrink-0 space-y-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center gap-2">
                <TabsList className="grid flex-1 grid-cols-3">
                  <TabsTrigger value="images" className="text-xs">
                    <ImageIcon className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Images</span>
                  </TabsTrigger>
                  <TabsTrigger value="style" className="text-xs">
                    <Palette className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Style</span>
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="text-xs">
                    <Layout className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Layout</span>
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={() => setIsPanelCollapsed(true)}
                  title="Hide editor panel"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </div>

              {/* Images Tab */}
              <TabsContent value="images" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Hero Image</CardTitle>
                    <CardDescription>
                      The main image displayed on your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video rounded-lg border-2 border-dashed border-border bg-muted/50 overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                      {content.heroImage ? (
                        <>
                          <img
                            src={content.heroImage || "/placeholder.svg"}
                            alt="Hero"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="secondary" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Replace Image
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                          <Upload className="h-8 w-8 mb-2" />
                          <p className="text-sm font-medium">
                            Upload Hero Image
                          </p>
                          <p className="text-xs">Recommended: 1920x1080px</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Photo Gallery</CardTitle>
                    <CardDescription>
                      Add engagement or pre-wedding photos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                        >
                          <Upload className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Style Tab */}
              <TabsContent value="style" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Typography</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Heading Font</Label>
                      <Select
                        value={styles.headingFont}
                        onValueChange={(value) =>
                          updateStyles("headingFont", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              <span className={font.style}>{font.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Body Font</Label>
                      <Select
                        value={styles.bodyFont}
                        onValueChange={(value) =>
                          updateStyles("bodyFont", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              <span className={font.style}>{font.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Color Palette</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {colorPresets.map((preset, index) => (
                        <button
                          key={preset.name}
                          onClick={() => updateStyles("colorPreset", index)}
                          className={cn(
                            "relative p-3 rounded-lg border-2 text-left transition-all",
                            styles.colorPreset === index
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground"
                          )}
                        >
                          {styles.colorPreset === index && (
                            <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="h-3 w-3 text-primary-foreground" />
                            </div>
                          )}
                          <div className="flex gap-1.5 mb-2">
                            <div
                              className="h-6 w-6 rounded-full border border-border"
                              style={{ backgroundColor: preset.primary }}
                            />
                            <div
                              className="h-6 w-6 rounded-full border border-border"
                              style={{ backgroundColor: preset.secondary }}
                            />
                            <div
                              className="h-6 w-6 rounded-full border border-border"
                              style={{ backgroundColor: preset.accent }}
                            />
                          </div>
                          <p className="text-xs font-medium">{preset.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Layout Tab */}
              <TabsContent value="layout" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Sections</CardTitle>
                    <CardDescription>
                      Toggle and reorder website sections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: "Hero", enabled: true },
                        { name: "Our Story", enabled: true },
                        { name: "Wedding Details", enabled: true },
                        { name: "Photo Gallery", enabled: true },
                        { name: "RSVP Form", enabled: true },
                        { name: "Registry", enabled: false },
                        { name: "FAQ", enabled: false },
                      ].map((section) => (
                        <div
                          key={section.name}
                          className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                        >
                          <span className="text-sm font-medium">
                            {section.name}
                          </span>
                          <Switch checked={section.enabled} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Right Panel - Preview */}
        <div className="bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm flex-1 min-w-0 overflow-hidden">
          <div className="border-b border-border py-3 px-4">
            <div className="flex flex-col gap-3">
              {/* Top row: Preview URL and view options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    Live Preview
                  </span>
                  <div className="flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5">
                    <span className="text-xs text-muted-foreground">
                      marriednext.com/
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      sarah-michael
                    </span>
                    <button
                      onClick={copyUrl}
                      className="ml-1 p-1 hover:bg-background rounded transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-border rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode("desktop")}
                      className={cn(
                        "p-1.5 rounded transition-colors",
                        previewMode === "desktop"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Monitor className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode("mobile")}
                      className={cn(
                        "p-1.5 rounded transition-colors",
                        previewMode === "mobile"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Smartphone className="h-4 w-4" />
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href="/sarah-michael"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Bottom row: Template info and actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Template:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {currentTemplate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                    Reset to Default
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/templates">
                      <LayoutTemplate className="h-3.5 w-3.5 mr-1.5" />
                      Change Template
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-0 bg-muted/30">
            <div
              className={cn(
                "mx-auto transition-all duration-300 bg-white overflow-auto",
                previewMode === "mobile"
                  ? "max-w-[375px] my-6 rounded-xl shadow-lg"
                  : "w-full"
              )}
              style={{
                maxHeight: "800px",
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[600px]">
                  <p className="text-muted-foreground">Loading preview...</p>
                </div>
              ) : data ? (
                <LisasTheme
                  fieldNameA={data.fieldNameA}
                  fieldNameB={data.fieldNameB}
                  fieldLocationName={data.fieldLocationName}
                  fieldLocationAddress={data.fieldLocationAddress}
                  fieldEventDate={data.fieldEventDate}
                  fieldEventTime={data.fieldEventTime}
                  fieldMapsShareUrl={data.fieldMapsShareUrl}
                  editable={true}
                  contained={true}
                />
              ) : (
                <div className="flex items-center justify-center min-h-[600px]">
                  <p className="text-muted-foreground">
                    No website data available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
