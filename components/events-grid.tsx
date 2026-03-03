"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const events = [
    {
        id: 1,
        image: "/events/africa-after-davos.jpeg",
        tags: ["Webinar", "Democracy"],
        title: "Africa After Davos",
        date: "Friday, March 6, 2026",
        location: "Zoom online webinar",
        shortDescription: "From Africa to the Americas, democracy is under strain. Elections are contested before ballots are cast. Public trust erodes as political offices are captured...",
        fullDescription: (
            <div className="space-y-4 text-sm text-[#484848] leading-relaxed">
                <p>
                    From Africa to the Americas, democracy is under strain. Elections are contested before ballots are cast. Public trust erodes as political offices are captured for private gain. Armed conflict, economic volatility, and digital manipulation reshape governance in real time.
                </p>
                <p>
                    In 1987, Richard Joseph named a problem that continues to haunt democracies worldwide. In Democracy and Prebendal Politics, first published in 1987 and soon to be reissued by Cambridge University Press, he introduced the concept of prebendalism to describe the appropriation of state offices and the diversion of public resources to serve personal, ethnic, and patronage networks. The consequences were clear: disorder, group conflict, and economic decline.
                </p>
                <p>
                    Today, the question feels urgent again.
                </p>
                <p>
                    Is prebendal politics no longer confined to a single national context? Has the diversion of democratic institutions toward private and factional ends become a global condition? Africa After Davos convenes leading scholars and policy experts to engage Joseph’s enduring ideas and to ask what they demand of us now. As global economic forums promise stability while insecurity deepens, this conversation turns to Africa not as a peripheral site of crisis, but as a critical lens for understanding the future of democracy itself. This Dialogue will interrogate what is at stake: is democratic governance able to withstand the pressures of patronage, polarization, and power consolidation across continents?
                </p>
                <p>
                    Join us for this timely and necessary conversation honoring Professor Richard Joseph’s intellectual legacy and engaging the urgent questions shaping politics today.
                </p>
            </div>
        ),
        link: "https://shorturl.at/mmHvd"
    }
]

export default function EventsGrid() {
    return (
        <div className="container mx-auto py-12 px-8">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {events.map((item) => (
                    <Dialog key={item.id}>
                        <DialogTrigger asChild>
                            <div className="group cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                {/* Image */}
                                <div className="overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Tags */}
                                    <div className="flex gap-2 mb-3">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="bg-[#000000] text-white px-3 py-1 rounded-full text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-[#000000] mb-2 leading-tight">{item.title}</h3>

                                    {/* Date & Location */}
                                    <div className="text-sm font-medium text-[#4ade80] mb-3">
                                        {item.date} • {item.location}
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-[#484848] leading-relaxed mb-4 flex-grow">{item.shortDescription}</p>

                                    {/* Link */}
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] font-semibold hover:underline text-sm flex items-center gap-1 break-all"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            🔗 Register/Join here: {item.link}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold mb-2">{item.title}</DialogTitle>
                                <div className="text-sm font-medium text-[#4ade80] mb-4">
                                    {item.date} • {item.location}
                                </div>
                            </DialogHeader>
                            <div className="mt-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto rounded-lg mb-6"
                                />
                                {item.fullDescription}
                            </div>
                            <div className="mt-8 pt-4 border-t border-gray-100">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#000000] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1a1a1a] transition-colors"
                                >
                                    🔗 Register/Join here: {item.link}
                                </a>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    )
}
