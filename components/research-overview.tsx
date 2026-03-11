import { Search, Zap, Lightbulb, Users } from "lucide-react"

type ResearchOverviewProps = {
  content: {
    overviewTitle: string
    overviewParagraphs: string[]
    questionsTitle: string
    questionsIntro: string
    questionsList: string[]
    contextTitle: string
    contextParagraphs: string[]
    methodologyTitle: string
    designTitle: string
    designParagraphs: string[]
    methodsList: string[]
    designClosing: string
    participatoryTitle: string
    participatoryParagraphs: string[]
  }
}

export default function ResearchOverview({ content }: ResearchOverviewProps) {
  return (
    <div className="bg-gray-50/50 py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Overview & Context Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Overview Section */}
          <div className="relative">
            <div className="absolute -left-6 lg:-left-12 top-0 h-full w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 hidden sm:block" />
            <div className="flex items-center gap-x-4 mb-8">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 outline outline-4 outline-white shadow-sm">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold font-bricolage text-gray-900">{content.overviewTitle}</h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
              {content.overviewParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Research Context Section */}
          <div className="relative bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100/60 h-max">
             <div className="flex items-center gap-x-4 mb-8">
              <div className="p-3 bg-black rounded-2xl text-white outline outline-4 outline-white shadow-sm">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold font-bricolage text-gray-900">{content.contextTitle}</h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              {content.contextParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Key Research Questions Section */}
        <div className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-3xl text-emerald-600 mb-6 shadow-sm">
               <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold font-bricolage text-gray-900 mb-6 leading-tight">
              {content.questionsTitle}
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              {content.questionsIntro}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {content.questionsList.map((question, index) => (
              <div 
                key={question} 
                className="bg-white p-8 rounded-3xl shadow-md border border-gray-100/80 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-2 bg-emerald-500 h-full transform origin-top transition-transform duration-500" />
                <div className="pl-6">
                   <div className="text-gray-300 font-bricolage font-bold text-5xl mb-4 group-hover:text-emerald-100 transition-colors duration-300">
                     0{index + 1}
                   </div>
                   <p className="text-gray-900 text-xl font-medium leading-relaxed">
                     {question}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology & Participatory Approach */}
        <div className="rounded-[2.5rem] bg-black p-8 sm:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            {/* Design & Methods (Left) */}
            <div className="lg:col-span-7 space-y-12 shrink-0">
               <div>
                 <div className="flex items-center gap-x-4 mb-6">
                    <div className="h-px w-12 bg-white/30" />
                    <h2 className="text-sm font-semibold tracking-widest text-white/70 uppercase">
                      {content.methodologyTitle}
                    </h2>
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-bold font-bricolage mb-8">
                    {content.designTitle}
                  </h3>
               </div>
               
               <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  {content.designParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
               </div>

               <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                  <ul className="space-y-6">
                    {content.methodsList.map((method) => (
                      <li key={method} className="flex gap-4 items-start">
                        <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-white text-lg font-medium">{method}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               {content.designClosing && (
                 <p className="text-gray-400 text-lg italic border-l-2 border-white/20 pl-6">
                    {content.designClosing}
                 </p>
               )}
            </div>

            {/* Participatory (Right) */}
            <div className="lg:col-span-5 h-full">
              <div className="bg-gradient-to-b from-emerald-900 to-black rounded-3xl p-8 sm:p-10 border border-emerald-500/20 shadow-2xl sticky top-8">
                <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 w-max mb-8">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold font-bricolage mb-8 text-white">
                  {content.participatoryTitle}
                </h3>
                <div className="space-y-6 text-emerald-100/70 text-lg leading-relaxed">
                  {content.participatoryParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
