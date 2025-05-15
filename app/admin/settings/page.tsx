"use client"

import { useState } from "react"
import { usePortfolio } from "@/contexts/portfolio-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsAdmin() {
  const { toast } = useToast()
  const { isLoading } = usePortfolio()

  const [settings, setSettings] = useState({
    general: {
      siteName: "Sampresh Karki",
      siteDescription: "Personal Portfolio Website",
      siteLanguage: "en",
    },
    appearance: {
      darkMode: true,
      accentColor: "#dc2626",
      showAnimations: true,
    },
    privacy: {
      cookieConsent: true,
      analyticsEnabled: true,
      contactFormDisclaimer: true,
    },
    advanced: {
      cacheEnabled: true,
      imageOptimization: true,
      lazyLoading: true,
    },
  })

  const handleGeneralSave = () => {
    toast({
      title: "Settings updated",
      description: "General settings have been updated successfully",
    })
  }

  const handleAppearanceSave = () => {
    toast({
      title: "Settings updated",
      description: "Appearance settings have been updated successfully",
    })
  }

  const handlePrivacySave = () => {
    toast({
      title: "Settings updated",
      description: "Privacy settings have been updated successfully",
    })
  }

  const handleAdvancedSave = () => {
    toast({
      title: "Settings updated",
      description: "Advanced settings have been updated successfully",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-4 bg-zinc-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's general settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  className="bg-zinc-800 border-zinc-700"
                  value={settings.general.siteName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  className="bg-zinc-800 border-zinc-700"
                  value={settings.general.siteDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, siteDescription: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteLanguage">Site Language</Label>
                <Input
                  id="siteLanguage"
                  className="bg-zinc-800 border-zinc-700"
                  value={settings.general.siteLanguage}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, siteLanguage: e.target.value },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleGeneralSave}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how your website looks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="block mb-1">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-gray-400">Enable dark mode by default</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, darkMode: checked },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="accentColor"
                    type="color"
                    className="w-16 h-10 bg-zinc-800 border-zinc-700"
                    value={settings.appearance.accentColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, accentColor: e.target.value },
                      })
                    }
                  />
                  <Input
                    className="bg-zinc-800 border-zinc-700"
                    value={settings.appearance.accentColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, accentColor: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showAnimations" className="block mb-1">
                    Show Animations
                  </Label>
                  <p className="text-sm text-gray-400">Enable animations throughout the website</p>
                </div>
                <Switch
                  id="showAnimations"
                  checked={settings.appearance.showAnimations}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, showAnimations: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleAppearanceSave}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage privacy and consent settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cookieConsent" className="block mb-1">
                    Cookie Consent
                  </Label>
                  <p className="text-sm text-gray-400">Show cookie consent banner to visitors</p>
                </div>
                <Switch
                  id="cookieConsent"
                  checked={settings.privacy.cookieConsent}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, cookieConsent: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analyticsEnabled" className="block mb-1">
                    Analytics
                  </Label>
                  <p className="text-sm text-gray-400">Enable website analytics</p>
                </div>
                <Switch
                  id="analyticsEnabled"
                  checked={settings.privacy.analyticsEnabled}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, analyticsEnabled: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contactFormDisclaimer" className="block mb-1">
                    Contact Form Disclaimer
                  </Label>
                  <p className="text-sm text-gray-400">Show privacy disclaimer on contact form</p>
                </div>
                <Switch
                  id="contactFormDisclaimer"
                  checked={settings.privacy.contactFormDisclaimer}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, contactFormDisclaimer: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handlePrivacySave}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced website settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cacheEnabled" className="block mb-1">
                    Browser Caching
                  </Label>
                  <p className="text-sm text-gray-400">Enable browser caching for better performance</p>
                </div>
                <Switch
                  id="cacheEnabled"
                  checked={settings.advanced.cacheEnabled}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      advanced: { ...settings.advanced, cacheEnabled: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="imageOptimization" className="block mb-1">
                    Image Optimization
                  </Label>
                  <p className="text-sm text-gray-400">Automatically optimize images for better performance</p>
                </div>
                <Switch
                  id="imageOptimization"
                  checked={settings.advanced.imageOptimization}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      advanced: { ...settings.advanced, imageOptimization: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lazyLoading" className="block mb-1">
                    Lazy Loading
                  </Label>
                  <p className="text-sm text-gray-400">Enable lazy loading for images and content</p>
                </div>
                <Switch
                  id="lazyLoading"
                  checked={settings.advanced.lazyLoading}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      advanced: { ...settings.advanced, lazyLoading: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleAdvancedSave}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
