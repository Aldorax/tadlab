import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import EventsGrid from "@/components/events-grid";
import { getEvents } from "@/app/actions/events";

export default async function EventsPage() {
    const rawEvents = await getEvents();

    const defaultEvent = {
        id: "1",
        image: "/events/africa-after-davos.jpeg",
        tags: ["Webinar", "Democracy"],
        title: "Africa After Davos",
        date: "Friday, March 6, 2026",
        location: "Zoom online webinar",
        shortDescription: "From Africa to the Americas, democracy is under strain. Elections are contested before ballots are cast. Public trust erodes as political offices are captured...",
        fullDescription: (
            <div className="space-y-4 text-sm text-[#484848] leading-relaxed">
                <p>From Africa to the Americas, democracy is under strain. Elections are contested before ballots are cast. Public trust erodes as political offices are captured for private gain. Armed conflict, economic volatility, and digital manipulation reshape governance in real time.</p>
                <p>In 1987, Richard Joseph named a problem that continues to haunt democracies worldwide. In Democracy and Prebendal Politics, first published in 1987 and soon to be reissued by Cambridge University Press, he introduced the concept of prebendalism to describe the appropriation of state offices and the diversion of public resources to serve personal, ethnic, and patronage networks. The consequences were clear: disorder, group conflict, and economic decline.</p>
                <p>Today, the question feels urgent again.</p>
                <p>Is prebendal politics no longer confined to a single national context? Has the diversion of democratic institutions toward private and factional ends become a global condition? Africa After Davos convenes leading scholars and policy experts to engage Joseph’s enduring ideas and to ask what they demand of us now. As global economic forums promise stability while insecurity deepens, this conversation turns to Africa not as a peripheral site of crisis, but as a critical lens for understanding the future of democracy itself. This Dialogue will interrogate what is at stake: is democratic governance able to withstand the pressures of patronage, polarization, and power consolidation across continents?</p>
                <p>Join us for this timely and necessary conversation honoring Professor Richard Joseph’s intellectual legacy and engaging the urgent questions shaping politics today.</p>
            </div>
        ),
        link: "https://brooklyn-cuny-edu.zoom.us/webinar/register/WN_M-h7SQgsTXySAlT32VJKBw"
    };

    const events = rawEvents.length > 0 ? rawEvents.map((e: any) => ({
        id: e.id,
        image: e.image,
        tags: e.tags,
        title: e.title,
        date: e.date,
        location: e.location,
        shortDescription: e.shortDescription,
        fullDescription: <div className="space-y-4 text-sm text-[#484848] leading-relaxed whitespace-pre-line">{e.fullDescription}</div>,
        link: e.link
    })) : [defaultEvent];

    return (
        <div className="min-h-screen">
            {/* Construction Banner */}
            <ConstructionBanner />

            {/* Hero Section */}
            <section
                className="relative h-[70vh] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/projects.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />

                {/* Navigation */}
                <NavBar />

                {/* Hero Content */}
                <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-16 flex items-end h-full font-bricolage">
                    <div className="max-w-3xl md:max-w-5xl">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]">
                            EVENTS
                        </h2>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="bg-[#fff] py-24">
                <div className="container mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 rounded-full bg-[#4ade80] mt-2" />
                            <h2 className="text-4xl font-bold text-[#1a1a1a]">Intro</h2>
                        </div>

                        <div className="flex-1 md:max-w-3xl">
                            <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] md:text-right mb-8">
                                Upcoming and Past Events
                            </h3>
                            <p className="text-[#767676] text-lg md:text-right leading-relaxed">
                                Join us for conversations, webinars, and dialogues that engage urgent questions shaping politics and society today.
                                <br />
                                <br />
                                Explore our events below to understand the future of democracy, governance, and disruption across continents.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <EventsGrid events={events} />

            {/* Footer */}
            <Footer />
        </div>
    );
}
