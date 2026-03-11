import Image from "next/image";

type MissionVisionSectionProps = {
  content?: {
    missionTitle?: string;
    missionBody?: string;
    missionImage?: string;
    missionPoints?: string[];
    visionTitle?: string;
    visionBody?: string;
  };
};

const defaultMissionVisionContent = {
  missionTitle: "Our Mission",
  missionBody:
    "To contribute to resilient, inclusive, and sustainable futures across Africa through rigorous, collaborative, and action-oriented research.",
  missionImage: "/images/mission.jpg",
  missionPoints: [
    "Understand societal disruptions by identifying shared patterns and mechanisms across contexts",
    "Ground research in real-world settings through participatory and experimental methods",
    "Co-create knowledge with stakeholders directly affected by change",
    "Translate research findings into accessible evidence that informs policy and practice",
  ],
  visionTitle: "Our Vision",
  visionBody:
    "A future in which African societies are better equipped to anticipate disruption, respond collectively, and build inclusive institutions grounded in evidence and lived realities.",
};

export default function MissionVisionSection({ content }: MissionVisionSectionProps) {
  const safeContent = {
    ...defaultMissionVisionContent,
    ...content,
    missionPoints: content?.missionPoints?.length
      ? content.missionPoints
      : defaultMissionVisionContent.missionPoints,
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div className="flex items-center gap-x-4 mb-6">
              <div className="h-px w-8 bg-black" />
              <h2 className="text-sm font-semibold tracking-widest text-gray-900 uppercase">
                {safeContent.missionTitle}
              </h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 font-bricolage leading-[1.1] mb-6">
              Driving change through tech and accountability.
            </h3>
          </div>
          <div className="lg:pt-14">
            <p className="text-gray-600 text-xl leading-relaxed whitespace-pre-line font-medium border-l-4 border-emerald-500 pl-6 h-full">
              {safeContent.missionBody}
            </p>
          </div>
        </div>

        {/* Full width image */}
        <div className="w-full aspect-[21/9] overflow-hidden mb-24 rounded-3xl shadow-2xl relative">
          <Image 
            src={safeContent.missionImage || "/images/mission.jpg"} 
            alt={safeContent.missionTitle} 
            fill
            className="object-cover hover:scale-105 transition-transform duration-700" 
          />
        </div>

        {/* Mission points and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Vision */}
          <div className="space-y-6">
            <div className="flex items-center gap-x-4 mb-8">
              <div className="h-px w-8 bg-black" />
              <h2 className="text-sm font-semibold tracking-widest text-gray-900 uppercase">
                {safeContent.visionTitle}
              </h2>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed font-medium">
              {safeContent.visionBody}
            </p>
            <div className="pt-8">
              <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-emerald-100 rounded-2xl text-emerald-700 w-16 h-16 sm:w-20 sm:h-20 shadow-inner">
                 <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Right - Bullet points */}
          <div className="space-y-6">
             <div className="flex items-center gap-x-4 mb-8">
              <div className="h-px w-8 bg-black" />
              <h2 className="text-sm font-semibold tracking-widest text-gray-900 uppercase">
                Core Focus Areas
              </h2>
            </div>
            <ul className="space-y-6 text-gray-600 text-lg">
              {safeContent.missionPoints.map((point) => (
                <li key={point} className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
