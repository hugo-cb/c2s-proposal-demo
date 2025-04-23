"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Save,
  SunMedium,
  Moon,
  Monitor,
  LayoutGrid,
  LayoutList,
  Palette,
  Eye,
  Maximize,
  Type
} from "lucide-react";

// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DisplayPreferencesProps {
  className?: string;
}

export function DisplayPreferences({ className }: DisplayPreferencesProps) {
  const [theme, setTheme] = useState("system");
  const [colorScheme, setColorScheme] = useState("blue");
  const [fontSize, setFontSize] = useState(16);
  const [density, setDensity] = useState("comfortable");
  const [defaultView, setDefaultView] = useState("grid");
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    animationsEnabled: true,
    showTooltips: true,
    highContrastMode: false,
    fullWidthLayout: true,
    showCodePreview: true,
    enableSyntaxHighlighting: true,
    showLineNumbers: true,
    showMinimap: false
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const colorSchemes = [
    { value: "blue", label: "Blue (Default)" },
    { value: "purple", label: "Purple" },
    { value: "green", label: "Green" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "gray", label: "Gray" }
  ];

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Theme Settings</CardTitle>
          <CardDescription>
            Customize the appearance of the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base">Theme Mode</Label>
              {/*<RadioGroup
                value={theme}
                onValueChange={setTheme}
                className="flex items-center gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer">
                    <SunMedium className="h-4 w-4" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer">
                    <Moon className="h-4 w-4" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system" className="flex items-center gap-2 cursor-pointer">
                    <Monitor className="h-4 w-4" />
                    System
                  </Label>
                </div>
              </RadioGroup>*/}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color-scheme">Color Scheme</Label>
              <div className="relative">
                <Palette className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select
                  value={colorScheme}
                  onValueChange={setColorScheme}
                >
                  <SelectTrigger id="color-scheme" className="pl-8">
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorSchemes.map((scheme) => (
                      <SelectItem key={scheme.value} value={scheme.value}>
                        {scheme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Font Size: {fontSize}px
                </Label>
              </div>
              <Slider
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-base">Density</Label>
              {/*<RadioGroup
                value={density}
                onValueChange={setDensity}
                className="flex items-center gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="density-compact" />
                  <Label htmlFor="density-compact" className="cursor-pointer">Compact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="density-comfortable" />
                  <Label htmlFor="density-comfortable" className="cursor-pointer">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spacious" id="density-spacious" />
                  <Label htmlFor="density-spacious" className="cursor-pointer">Spacious</Label>
                </div>
              </RadioGroup>*/}
            </div>
            
            <div>
              <Label className="text-base">Default View</Label>
              {/*<RadioGroup
                value={defaultView}
                onValueChange={setDefaultView}
                className="flex items-center gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="grid" id="view-grid" />
                  <Label htmlFor="view-grid" className="flex items-center gap-2 cursor-pointer">
                    <LayoutGrid className="h-4 w-4" />
                    Grid
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="list" id="view-list" />
                  <Label htmlFor="view-list" className="flex items-center gap-2 cursor-pointer">
                    <LayoutList className="h-4 w-4" />
                    List
                  </Label>
                </div>
              </RadioGroup>*/}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Visual Preferences</CardTitle>
          <CardDescription>
            Configure visual elements and accessibility options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="animations-enabled">Animations</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable animations and transitions
                </p>
              </div>
              <Switch
                id="animations-enabled"
                checked={preferences.animationsEnabled}
                onCheckedChange={(checked) => setPreferences({ ...preferences, animationsEnabled: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-tooltips">Tooltips</Label>
                <p className="text-sm text-muted-foreground">
                  Show tooltips when hovering over elements
                </p>
              </div>
              <Switch
                id="show-tooltips"
                checked={preferences.showTooltips}
                onCheckedChange={(checked) => setPreferences({ ...preferences, showTooltips: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast-mode">High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch
                id="high-contrast-mode"
                checked={preferences.highContrastMode}
                onCheckedChange={(checked) => setPreferences({ ...preferences, highContrastMode: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Maximize className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="full-width-layout">Full Width Layout</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use the full width of the screen for content
                </p>
              </div>
              <Switch
                id="full-width-layout"
                checked={preferences.fullWidthLayout}
                onCheckedChange={(checked) => setPreferences({ ...preferences, fullWidthLayout: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Code Display Settings</CardTitle>
          <CardDescription>
            Configure how code is displayed in the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-code-preview">Code Preview</Label>
                <p className="text-sm text-muted-foreground">
                  Show code previews in analysis results
                </p>
              </div>
              <Switch
                id="show-code-preview"
                checked={preferences.showCodePreview}
                onCheckedChange={(checked) => setPreferences({ ...preferences, showCodePreview: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-syntax-highlighting">Syntax Highlighting</Label>
                <p className="text-sm text-muted-foreground">
                  Enable syntax highlighting for code snippets
                </p>
              </div>
              <Switch
                id="enable-syntax-highlighting"
                checked={preferences.enableSyntaxHighlighting}
                onCheckedChange={(checked) => setPreferences({ ...preferences, enableSyntaxHighlighting: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-line-numbers">Line Numbers</Label>
                <p className="text-sm text-muted-foreground">
                  Show line numbers in code blocks
                </p>
              </div>
              <Switch
                id="show-line-numbers"
                checked={preferences.showLineNumbers}
                onCheckedChange={(checked) => setPreferences({ ...preferences, showLineNumbers: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-minimap">Code Minimap</Label>
                <p className="text-sm text-muted-foreground">
                  Show a minimap for navigating large code files
                </p>
              </div>
              <Switch
                id="show-minimap"
                checked={preferences.showMinimap}
                onCheckedChange={(checked) => setPreferences({ ...preferences, showMinimap: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CardFooter className="flex justify-end gap-4 px-0">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </>
          )}
        </Button>
      </CardFooter>
    </div>
  );
}
