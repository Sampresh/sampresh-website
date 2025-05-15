"use client"

import type React from "react"
import { usePortfolio } from "@/contexts/portfolio-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ProfileAdmin() {
  const { toast } = useToast()
  const { profileInfo, setProfileInfo, isLoading } = usePortfolio()

  const handlePersonalInfoSave = () => {
    setProfileInfo({
      ...profileInfo,
    })

    toast({
      title: "Profile updated",
      description: "Your personal information has been updated successfully",
    })
  }

  const handleCvSave = () => {
    setProfileInfo({
      ...profileInfo,
    })

    toast({
      title: "CV updated",
      description: "Your CV information has been updated successfully",
    })
  }

  const handleSocialLinksSave = () => {
    setProfileInfo({
      ...profileInfo,
    })

    toast({
      title: "Social links updated",
      description: "Your social links have been updated successfully",
    })
  }

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

      setProfileInfo({
        ...profileInfo,
        cv: {
          ...profileInfo.cv,
          fileName: file.name,
          uploadDate: date,
        },
      })

      toast({
        title: "CV uploaded",
        description: "Your CV has been uploaded successfully",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading profile information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3 bg-zinc-800">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="resume">Resume/CV</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and bio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    className="bg-zinc-800 border-zinc-700"
                    value={profileInfo.name}
                    onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    className="bg-zinc-800 border-zinc-700"
                    value={profileInfo.title}
                    onChange={(e) => setProfileInfo({ ...profileInfo, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.email}
                  onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  className="min-h-32 bg-zinc-800 border-zinc-700"
                  value={profileInfo.bio}
                  onChange={(e) => setProfileInfo({ ...profileInfo, bio: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.location}
                  onChange={(e) => setProfileInfo({ ...profileInfo, location: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handlePersonalInfoSave}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Resume/CV</CardTitle>
              <CardDescription>Upload and manage your resume or CV.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-10 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                  <p className="text-sm text-gray-400">Drag and drop your CV here, or click to browse</p>
                  <div className="relative">
                    <Button variant="outline" className="mt-2">
                      Upload CV
                    </Button>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv-title">CV Title</Label>
                <Input
                  id="cv-title"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.cv.title}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      cv: { ...profileInfo.cv, title: e.target.value },
                    })
                  }
                />
              </div>

              {profileInfo.cv.fileName && (
                <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                      <path d="M10 9H8" />
                    </svg>
                    <div>
                      <p className="font-medium">{profileInfo.cv.fileName}</p>
                      <p className="text-xs text-gray-400">Uploaded on {profileInfo.cv.uploadDate}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={() => {
                      setProfileInfo({
                        ...profileInfo,
                        cv: {
                          ...profileInfo.cv,
                          fileName: "",
                          uploadDate: "",
                        },
                      })
                      toast({
                        title: "CV removed",
                        description: "Your CV has been removed successfully",
                      })
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleCvSave}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect your social media accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.socialLinks.github}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      socialLinks: { ...profileInfo.socialLinks, github: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.socialLinks.linkedin}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      socialLinks: { ...profileInfo.socialLinks, linkedin: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.socialLinks.twitter}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      socialLinks: { ...profileInfo.socialLinks, twitter: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Personal Website</Label>
                <Input
                  id="website"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.socialLinks.website}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      socialLinks: { ...profileInfo.socialLinks, website: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dribbble">Dribbble</Label>
                <Input
                  id="dribbble"
                  className="bg-zinc-800 border-zinc-700"
                  value={profileInfo.socialLinks.dribbble}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      socialLinks: { ...profileInfo.socialLinks, dribbble: e.target.value },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleSocialLinksSave}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
