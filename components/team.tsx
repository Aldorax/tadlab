export default function TeamSection() {
  const teamMembers = [
    {
      name: "Octavian Princewill",
      role: "Designer",
      image: "/professional-portrait-woman-with-afro-black-and-wh.jpg",
    },
    {
      name: "Octavian Princewill",
      role: "Designer",
      image: "/professional-portrait-man-dark-background.jpg",
    },
    {
      name: "Octavian Princewill",
      role: "Designer",
      image: "/professional-portrait-man-glasses-office.jpg",
    },
    {
      name: "Octavian Princewill",
      role: "Designer",
      image: "/professional-portrait-woman-light-background.jpg",
    },
    {
      name: "Octavian Princewill",
      role: "Designer",
      image: "/professional-portrait-man-mature.jpg",
    },
    {
      name: "Octavian Princewill",
      role: "Designer",
      image: "/professional-portrait-woman-red-background-profile.jpg",
    },
  ]

  return (
    <section className="py-16 px-6 container mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#489f68]" />
          <h2 className="text-4xl font-bold text-[#1a1a1a]">Our Team</h2>
        </div>
        <p className="text-[#767676] text-lg leading-relaxed max-w-2xl lg:text-right">
          The African Futures and Disruption Studies Lab brings together an interdisciplinary group of researchers,
          scholars, and collaborators with expertise across social sciences, migration studies, political analysis, and
          applied research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white border border-[#e8e8e8] overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={member.image || "/images/zebra.jpg"} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{member.name}</h3>
              <p className="text-[#767676] text-base">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
