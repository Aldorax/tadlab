export default function MissionVisionSection() {
  return (
    <section className="py-16 px-6">
      {/* Mission Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#489f68]" />
            <h2 className="text-4xl font-bold text-[#1a1a1a]">Our Mission</h2>
          </div>
          <div>
            <p className="text-[#767676] text-2xl leading-relaxed">
              To contribute to resilient, inclusive, and sustainable futures across Africa through rigorous,
              collaborative, and action-oriented research.
            </p>
          </div>
        </div>

        {/* Full width image */}
        <div className="w-full aspect-[21/9] overflow-hidden mb-16">
          <img src="/images/zebra.jpg" alt="Community gathering" className="w-full h-full object-cover" />
        </div>

        {/* Mission points and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Bullet points */}
          <div className="space-y-4">
            <ul className="space-y-4 text-[#767676] text-lg">
              <li className="flex gap-3">
                <span className="text-[#1a1a1a] font-bold mt-1">•</span>
                <span>
                  Understand societal disruptions by identifying shared patterns and mechanisms across contexts
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1a1a1a] font-bold mt-1">•</span>
                <span>Ground research in real-world settings through participatory and experimental methods</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1a1a1a] font-bold mt-1">•</span>
                <span>Co-create knowledge with stakeholders directly affected by change</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1a1a1a] font-bold mt-1">•</span>
                <span>Translate research findings into accessible evidence that informs policy and practice</span>
              </li>
            </ul>
          </div>

          {/* Right - Vision */}
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-[#489f68] mt-2" />
            <h2 className="text-4xl font-bold text-[#1a1a1a]">Our Vision</h2>
          </div>
        </div>
      </div>
    </section>
  )
}
