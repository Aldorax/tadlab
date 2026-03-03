"use client";

import ConstructionBanner from "@/components/construction-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import EventsGrid from "@/components/events-grid";

export default function EventsPage() {
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
            <EventsGrid />

            {/* Footer */}
            <Footer />
        </div>
    );
}
