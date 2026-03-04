"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Share2, Download, Twitter, Linkedin, Facebook, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export interface EventItem {
    id: string;
    image: string;
    tags: string[];
    title: string;
    date: string;
    location: string;
    shortDescription: string;
    fullDescription: string | React.ReactNode;
    link: string;
}

export default function EventsGrid({ events: initialEvents }: { events: EventItem[] }) {
    const [openEventId, setOpenEventId] = useState<string | null>(null);
    const [events, setEvents] = useState(initialEvents);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    useEffect(() => {
        setEvents(initialEvents);
        setCurrentPage(1);
    }, [initialEvents]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const data = event.data;
            if (data?.type === 'PREVIEW_EVENT') {
                setEvents(prev => {
                    const newPreview = { id: 'preview-evt', ...data.payload };
                    const others = initialEvents;
                    return [newPreview, ...others.filter(e => e.id !== 'preview-evt')];
                });
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [initialEvents]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#event-')) {
            const id = hash.replace('#event-', '');
            setOpenEventId(id);
        }
    }, []);

    const handleOpenChange = (eventId: string, open: boolean) => {
        if (open) {
            setOpenEventId(eventId);
            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', `#event-${eventId}`);
            }
        } else {
            setOpenEventId(null);
            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', window.location.pathname + window.location.search);
            }
        }
    };

    const totalPages = Math.max(1, Math.ceil(events.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: "smooth" });
    };

    return (
        <div className="container mx-auto py-12 px-8">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedEvents.map((item) => (
                    <Dialog
                        key={item.id}
                        open={openEventId === item.id}
                        onOpenChange={(open) => handleOpenChange(item.id, open)}
                    >
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
                            <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#000000] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1a1a1a] transition-colors"
                                >
                                    🔗 Register/Join here: {item.link}
                                </a>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500 mr-2 flex items-center gap-1">
                                        <Share2 className="w-4 h-4" /> Share:
                                    </span>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#event-${item.id}` : '')}&text=${encodeURIComponent(`Check out this event: ${item.title}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                        title="Share on X (Twitter)"
                                    >
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#event-${item.id}` : '')}&title=${encodeURIComponent(item.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                        title="Share on LinkedIn"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const url = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#event-${item.id}` : '';
                                            navigator.clipboard.writeText(url);
                                            toast.success("Link copied to clipboard!");
                                        }}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                        title="Copy Link"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#event-${item.id}` : '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                        title="Share on Facebook"
                                    >
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={item.image}
                                        download={`flier-${item.id}.jpeg`}
                                        className="flex items-center gap-1 p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full transition-colors ml-2 font-medium text-sm"
                                        title="Download Flier"
                                    >
                                        <Download className="w-4 h-4" /> Flier
                                    </a>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-5 py-2 border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Prev
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${currentPage === page
                                    ? "bg-black text-white"
                                    : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5]"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <Button
                        variant="outline"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-5 py-2 border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
