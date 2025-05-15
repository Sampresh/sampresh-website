import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Layout, Server, Brain, Shield, Palette } from "lucide-react"
import { memo } from "react"

// Memoize the SkillCard component to prevent unnecessary re-renders
const SkillCard = memo(function SkillCard({ skill, index }: { skill: any; index: number }) {
  return (
    <Card key={index} className="bg-black border-zinc-800 hover:border-red-500/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {skill.icon}
          <h3 className="text-xl font-semibold">{skill.category}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skill.items.map((item: string, idx: number) => (
            <Badge key={idx} variant="outline" className="bg-zinc-900 border-zinc-800 text-gray-300">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
})

export function SkillsSection() {
  const skills = [
    {
      category: "Programming Languages",
      icon: <Code className="h-6 w-6 text-red-500" />,
      items: ["Python", "JavaScript", "HTML", "CSS", "Kotlin"],
    },
    {
      category: "Web Development",
      icon: <Layout className="h-6 w-6 text-red-500" />,
      items: ["Next.js", "Tailwind CSS", "MongoDB", "HTML", "CSS", "JavaScript"],
    },
    {
      category: "Frameworks & Tools",
      icon: <Server className="h-6 w-6 text-red-500" />,
      items: ["Django", "Kotlin (Android)", "Git", "GitHub"],
    },
    {
      category: "Database Management",
      icon: <Database className="h-6 w-6 text-red-500" />,
      items: ["MongoDB", "Firebase"],
    },
    {
      category: "AI & Machine Learning",
      icon: <Brain className="h-6 w-6 text-red-500" />,
      items: ["Data preprocessing", "Model training", "Stock prediction", "S&P 500 data analysis"],
    },
    {
      category: "Cybersecurity",
      icon: <Shield className="h-6 w-6 text-red-500" />,
      items: ["Web security", "Login authentication", "Secure frontend practices"],
    },
    {
      category: "Core Skills",
      icon: <Globe className="h-6 w-6 text-red-500" />,
      items: [
        "Creative Problem Solving",
        "Project Development",
        "Team Collaboration",
        "Adaptability",
        "Time Management",
      ],
    },
    {
      category: "Creative Skills",
      icon: <Palette className="h-6 w-6 text-red-500" />,
      items: ["Content Creation", "UI/UX Awareness", "Client Communication", "Travel Operations"],
    },
  ]

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I've worked with a variety of technologies and frameworks to create seamless digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
