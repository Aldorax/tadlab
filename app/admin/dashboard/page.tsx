"use client";

import { useState, useEffect } from "react";
import {
    Upload, Plus, Calendar, Image as ImageIcon,
    FileText, Settings, LogOut, BookOpen, MonitorPlay
} from "lucide-react";
import { createEvent, getEvents, deleteEvent } from "@/app/actions/events";
import { getPageContent, updatePageContent } from "@/app/actions/content";
import { createProject, getProjects, deleteProject } from "@/app/actions/projects";
import { useRef } from "react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("content");

    // Events State
    const [events, setEvents] = useState<any[]>([]);

    // Projects State
    const [projects, setProjects] = useState<any[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State (Shared between Event and Project for simplicity)
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // Content State
    const [pageId, setPageId] = useState("homepage");
    const [contentData, setContentData] = useState<any>({
        heroTitle: "",
        heroSub: "",
        heroImage: ""
    });

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const getPreviewPath = () => {
        if (activeTab === "events") return "/events";
        if (activeTab === "projects") return "/projects";
        if (activeTab === "content" && pageId === "about") return "/about-us";
        if (activeTab === "content" && pageId === "research") return "/research";
        return "/";
    };

    const previewPath = getPreviewPath();

    useEffect(() => {
        if (activeTab === "events") loadEvents();
        if (activeTab === "projects") loadProjects();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === "content") loadContent();
    }, [activeTab, pageId]);

    const loadEvents = async () => setEvents(await getEvents());
    const loadProjects = async () => setProjects(await getProjects());

    const loadContent = async () => {
        const data = await getPageContent(pageId);
        if (data) {
            setContentData({
                heroTitle: data.heroTitle || "",
                heroSub: data.heroSub || "",
                heroImage: data.heroImage || ""
            });
        } else {
            setContentData({ heroTitle: "", heroSub: "", heroImage: "" });
        }
    };

    useEffect(() => {
        if (activeTab === 'content' && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'PREVIEW_CONTENT',
                pageId,
                payload: contentData
            }, "*");
        }
    }, [contentData, pageId, activeTab]);

    useEffect(() => {
        if (activeTab === 'projects' && iframeRef.current?.contentWindow) {
            const imageUrl = file ? URL.createObjectURL(file) : "/images/about/1.jpg";
            iframeRef.current.contentWindow.postMessage({
                type: 'PREVIEW_PROJECT',
                payload: {
                    title: title || "New Project Title",
                    description: description || "Project description...",
                    image: imageUrl,
                    tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : ["Tag 1", "Tag 2"]
                }
            }, "*");
        }
    }, [title, description, file, tags, activeTab]);

    useEffect(() => {
        if (activeTab === 'events' && iframeRef.current?.contentWindow) {
            const imageUrl = file ? URL.createObjectURL(file) : "/events/africa-after-davos.jpeg";
            iframeRef.current.contentWindow.postMessage({
                type: 'PREVIEW_EVENT',
                payload: {
                    title: title || "New Event Title",
                    date: date || "Date/Time Details Here",
                    location: location || "Event Location",
                    shortDescription: description || "",
                    fullDescription: description || "",
                    image: imageUrl,
                    link: link || "#",
                    tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : ["Event"]
                }
            }, "*");
        }
    }, [title, date, location, description, link, file, tags, activeTab]);


    const handleContentSubmit = async () => {
        setIsSubmitting(true);
        try {
            await updatePageContent(pageId, contentData);
            alert("Content updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update content");
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Failed to upload image");
        const data = await uploadRes.json();
        return data.url;
    };

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let imageUrl = "/events/africa-after-davos.jpeg";
            if (file) imageUrl = await uploadImage(file);

            await createEvent({
                title, date, location, link, fullDescription: description,
                image: imageUrl, tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            });

            alert("Event created successfully!");
            resetForm();
            loadEvents();
        } catch (error) {
            console.error(error);
            alert("Failed to create event");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let imageUrl = "/images/about/1.jpg";
            if (file) imageUrl = await uploadImage(file);

            await createProject({
                title, description, image: imageUrl,
                tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            });

            alert("Project created successfully!");
            resetForm();
            loadProjects();
        } catch (error) {
            console.error(error);
            alert("Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setTitle(""); setDate(""); setLocation(""); setDescription(""); setLink(""); setTags(""); setFile(null);
    };

    const handleDeleteEvent = async (id: string) => {
        if (confirm("Are you sure you want to delete this event?")) {
            await deleteEvent(id);
            loadEvents();
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
            loadProjects();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col z-10">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">TADLab Admin</h2>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <button
                        onClick={() => setActiveTab("content")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "content" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        <FileText className="w-5 h-5" /> Pages Content
                    </button>
                    <button
                        onClick={() => { setActiveTab("projects"); resetForm(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "projects" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        <BookOpen className="w-5 h-5" /> Projects
                    </button>
                    <button
                        onClick={() => { setActiveTab("events"); resetForm(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "events" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        <Calendar className="w-5 h-5" /> Events
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "settings" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        <Settings className="w-5 h-5" /> Settings
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                </div>
            </div>

            {/* Forms Content */}
            <div className="w-[500px] xl:w-[600px] shrink-0 p-8 h-screen overflow-y-auto border-r border-gray-200 bg-white">
                {activeTab === "content" && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Manager</h1>
                                <p className="text-gray-500">Edit text and images across website pages.</p>
                            </div>
                            <select
                                value={pageId}
                                onChange={(e) => setPageId(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white"
                            >
                                <option value="homepage">Homepage</option>
                                <option value="about">About Us</option>
                                <option value="research">Research</option>
                            </select>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="border-b border-gray-200 bg-gray-50 p-4">
                                <h3 className="font-semibold text-gray-700">Hero Section Content</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Headline</label>
                                    <input type="text" value={contentData.heroTitle} onChange={(e) => setContentData({ ...contentData, heroTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline / Intro text</label>
                                    <textarea rows={6} value={contentData.heroSub} onChange={(e) => setContentData({ ...contentData, heroSub: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
                                    <input type="url" value={contentData.heroImage} onChange={(e) => setContentData({ ...contentData, heroImage: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-end">
                                    <button onClick={handleContentSubmit} disabled={isSubmitting} className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400">
                                        {isSubmitting ? "Publishing..." : "Publish Changes"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "projects" && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
                        </div>

                        <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-200 p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-gray-500" /> Create New Project
                            </h2>
                            <form className="space-y-6" onSubmit={handleProjectSubmit}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Project Title</label>
                                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Tags (comma separated)</label>
                                        <input type="text" placeholder="Tech, Political Change" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Description</label>
                                        <textarea rows={4} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Project Image</label>
                                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                                        <div className="space-y-1 text-center">
                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none p-1">
                                                    <span>Upload a file</span>
                                                    <input type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} accept="image/*" />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">{file ? file.name : "PNG, JPG up to 5MB"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg disabled:bg-gray-400">
                                        {isSubmitting ? "Saving..." : "Save Project"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Active Projects (Database)</h3>
                            <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
                                {projects.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500 text-sm">No projects found. Create one above!</div>
                                ) : (
                                    projects.map((project) => (
                                        <div key={project.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div>
                                                <div className="font-medium text-gray-900">{project.title}</div>
                                                <div className="text-sm text-gray-500 flex gap-1 mt-1">
                                                    {project.tags.map((t: string) => <span key={t} className="bg-gray-200 px-2 py-0.5 rounded text-xs">{t}</span>)}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleDeleteProject(project.id)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "events" && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
                        </div>

                        <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-200 p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-gray-500" /> Upload New Event / Flier
                            </h2>
                            <form className="space-y-6" onSubmit={handleEventSubmit}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Event Title</label>
                                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Date</label>
                                        <input type="text" placeholder="e.g. Friday, March 6, 2026" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Location</label>
                                        <input type="text" placeholder="Zoom Online Webinar" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Registration Link</label>
                                        <input type="url" required value={link} onChange={(e) => setLink(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Tags (comma separated)</label>
                                        <input type="text" placeholder="Webinar, Democracy" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Full Description</label>
                                        <textarea rows={4} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Event Flier</label>
                                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                                        <div className="space-y-1 text-center">
                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none p-1">
                                                    <span>Upload a file</span>
                                                    <input type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} accept="image/*" />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">{file ? file.name : "PNG, JPG up to 5MB"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg disabled:bg-gray-400">
                                        {isSubmitting ? "Saving..." : "Save Event"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Active Events (Database)</h3>
                            <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
                                {events.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500 text-sm">No events found. Create one above!</div>
                                ) : (
                                    events.map((event) => (
                                        <div key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div>
                                                <div className="font-medium text-gray-900">{event.title}</div>
                                                <div className="text-sm text-gray-500">{event.date}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleDeleteEvent(event.id)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Live Preview Panel */}
            <div className="flex-1 bg-gray-100 h-screen flex flex-col relative overflow-hidden hidden md:flex">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm z-10 shrink-0">
                    <div className="flex items-center gap-2">
                        <MonitorPlay className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Live Draft Preview <span className="text-gray-400 font-normal">({previewPath})</span></span>
                    </div>
                    <button onClick={() => {
                        if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
                    }} className="text-xs bg-gray-50 text-gray-600 border px-3 py-1.5 rounded shadow-sm hover:bg-gray-100 transition-colors">
                        Hard Refresh Frame
                    </button>
                </div>
                <div className="flex-1 relative bg-white">
                    <iframe key={previewPath} ref={iframeRef} src={previewPath} className="absolute inset-0 w-full h-full border-none shadow-inner" />
                </div>
            </div>
        </div>
    );
}
