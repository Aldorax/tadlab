import { Search, Users, MapPin, FileText } from "lucide-react"

type GuidingPrinciplesSectionProps = {
  content: {
    sectionTitle: string
    principle1Title: string
    principle1Description: string
    principle2Title: string
    principle2Description: string
    principle3Title: string
    principle3Description: string
    principle4Title: string
    principle4Description: string
  }
}

export default function GuidingPrinciplesSection({ content }: GuidingPrinciplesSectionProps) {
  const principles = [
    {
      number: "01",
      icon: Search,
      title: content.principle1Title,
      description: content.principle1Description,
    },
    {
      number: "02",
      icon: Users,
      title: content.principle2Title,
      description: content.principle2Description,
    },
    {
      number: "03",
      icon: MapPin,
      title: content.principle3Title,
      description: content.principle3Description,
    },
    {
      number: "04",
      icon: FileText,
      title: content.principle4Title,
      description: content.principle4Description,
    },
  ]

  return (
    <section className="bg-black py-24 sm:py-32 px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 lg:mb-32">
           <div>
            <div className="flex items-center gap-x-4 mb-6">
              <div className="h-px w-8 bg-white/50" />
              <h2 className="text-sm font-semibold tracking-widest text-white/70 uppercase">
                Core Logic
              </h2>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white font-bricolage leading-tight">
              {content.sectionTitle}
            </h2>
          </div>
          <div className="md:max-w-md">
             <p className="text-gray-400 text-lg">
                The foundational rules that govern how we interact, build, and deploy new technological standards.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <div key={principle.number} className="group relative">
                <div className="space-y-4 mb-8">
                  <p className="text-gray-500 font-mono text-xl">{principle.number}</p>
                  <div className="border-t-2 border-white/20 group-hover:border-emerald-500 transition-colors duration-500" />
                </div>

                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                  <Icon className="w-8 h-8 text-white group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={1.5} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white leading-tight font-bricolage">{principle.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{principle.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
