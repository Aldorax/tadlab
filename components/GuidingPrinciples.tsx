import { Search, Users, MapPin, FileText } from "lucide-react"

export default function GuidingPrinciplesSection() {
  const principles = [
    {
      number: "01",
      icon: Search,
      title: "Evidence-Based Inquiry",
      description: "Research priorities and interpretations are rooted in African realities and contexts.",
    },
    {
      number: "02",
      icon: Users,
      title: "Participation and Co-Creation",
      description: "Stakeholders actively shape research questions, methods, and outcomes",
    },
    {
      number: "03",
      icon: MapPin,
      title: "Africa-Centered Perspectives",
      description: "Research priorities and interpretations are rooted in African realities and contexts.",
    },
    {
      number: "04",
      icon: FileText,
      title: "Transparency and Accessibility",
      description:
        "Research priorities and interpretationFindings are presented in clear and interpretable formats.ns are rooted in African realities and contexts.",
    },
  ]

  return (
    <section className="bg-[#000] py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-white text-right mb-16">Guiding Principles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <div key={principle.number} className="space-y-6">
                <div className="space-y-4">
                  <p className="text-[#767676] text-lg">{principle.number}</p>
                  <div className="border-t border-[#484848]" />
                </div>

                <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white leading-tight">{principle.title}</h3>
                  <p className="text-[#767676] text-base leading-relaxed">{principle.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
