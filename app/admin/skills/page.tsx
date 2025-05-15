"use client"

import { useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"
import { usePortfolio } from "@/contexts/portfolio-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function SkillsAdmin() {
  const { toast } = useToast()
  const { skills, setSkills, isLoading } = usePortfolio()

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<any>(null)
  const [newSkill, setNewSkill] = useState({
    category: "",
    items: "",
  })

  const defaultSkills = [
    {
      id: 1,
      category: "Programming Languages",
      items: ["Python", "JavaScript", "HTML", "CSS", "Kotlin"],
    },
    {
      id: 2,
      category: "Web Development",
      items: ["Next.js", "Tailwind CSS", "MongoDB", "HTML", "CSS", "JavaScript"],
    },
    {
      id: 3,
      category: "Frameworks & Tools",
      items: ["Django", "Kotlin (Android)", "Git", "GitHub"],
    },
    {
      id: 4,
      category: "Database Management",
      items: ["MongoDB", "Firebase"],
    },
    {
      id: 5,
      category: "AI & Machine Learning",
      items: ["Data preprocessing", "Model training", "Stock prediction", "S&P 500 data analysis"],
    },
    {
      id: 6,
      category: "Cybersecurity",
      items: ["Web security", "Login authentication", "Secure frontend practices"],
    },
    {
      id: 7,
      category: "Core Skills",
      items: [
        "Creative Problem Solving",
        "Project Development",
        "Team Collaboration",
        "Adaptability",
        "Time Management",
      ],
    },
    {
      id: 8,
      category: "Creative Skills",
      items: ["Content Creation", "UI/UX Awareness", "Client Communication", "Travel Operations"],
    },
  ]

  // Initialize skills if empty
  const skillsList = skills.length > 0 ? skills : defaultSkills

  const filteredSkills = skillsList.filter((skill) => skill.category.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddSkill = () => {
    const newId = skillsList.length > 0 ? Math.max(...skillsList.map((s) => s.id || 0)) + 1 : 1

    const skillToAdd = {
      id: newId,
      category: newSkill.category,
      items: newSkill.items.split(",").map((item) => item.trim()),
    }

    setSkills([...skillsList, skillToAdd])

    setNewSkill({
      category: "",
      items: "",
    })

    setIsAddDialogOpen(false)

    toast({
      title: "Skill added",
      description: "The skill category has been added successfully",
    })
  }

  const handleEditSkill = () => {
    if (!currentSkill) return

    setSkills(
      skillsList.map((skill) =>
        skill.id === currentSkill.id
          ? {
              ...currentSkill,
              items:
                typeof currentSkill.items === "string"
                  ? currentSkill.items.split(",").map((item: string) => item.trim())
                  : currentSkill.items,
            }
          : skill,
      ),
    )

    setIsEditDialogOpen(false)

    toast({
      title: "Skill updated",
      description: "The skill category has been updated successfully",
    })
  }

  const handleDeleteSkill = () => {
    if (!currentSkill) return

    setSkills(skillsList.filter((skill) => skill.id !== currentSkill.id))

    setIsDeleteDialogOpen(false)

    toast({
      title: "Skill deleted",
      description: "The skill category has been deleted successfully",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading skills...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button className="bg-red-500 hover:bg-red-600" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Skill Category
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>Add, edit or remove your skill categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <Input
              placeholder="Search skills..."
              className="max-w-sm bg-zinc-800 border-zinc-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                <TableHead>Category</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSkills.map((skill) => (
                <TableRow key={skill.id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium">{skill.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.slice(0, 3).map((item, idx) => (
                        <Badge key={idx} variant="outline" className="bg-zinc-800 border-zinc-700">
                          {item}
                        </Badge>
                      ))}
                      {skill.items.length > 3 && (
                        <Badge variant="outline" className="bg-zinc-800 border-zinc-700">
                          +{skill.items.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentSkill({
                            ...skill,
                            items: Array.isArray(skill.items) ? skill.items.join(", ") : skill.items,
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => {
                          setCurrentSkill(skill)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Skill Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Add New Skill Category</DialogTitle>
            <DialogDescription>Add a new skill category to your portfolio.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category Name</Label>
              <Input
                id="category"
                placeholder="Programming Languages"
                className="bg-zinc-800 border-zinc-700"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="items">Skills (comma separated)</Label>
              <Textarea
                id="items"
                placeholder="JavaScript, Python, TypeScript"
                className="bg-zinc-800 border-zinc-700"
                value={newSkill.items}
                onChange={(e) => setNewSkill({ ...newSkill, items: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleAddSkill}>
              Add Skill Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Skill Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Edit Skill Category</DialogTitle>
            <DialogDescription>Update skill category details.</DialogDescription>
          </DialogHeader>
          {currentSkill && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category Name</Label>
                <Input
                  id="edit-category"
                  className="bg-zinc-800 border-zinc-700"
                  value={currentSkill.category}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-items">Skills (comma separated)</Label>
                <Textarea
                  id="edit-items"
                  className="bg-zinc-800 border-zinc-700"
                  value={currentSkill.items}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, items: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleEditSkill}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Skill Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Delete Skill Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this skill category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentSkill && (
            <div className="py-4">
              <p className="font-medium">{currentSkill.category}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(currentSkill.items) &&
                  currentSkill.items.map((item: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="bg-zinc-800 border-zinc-700">
                      {item}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSkill}>
              Delete Skill Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
