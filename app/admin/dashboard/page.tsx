"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileText,
  Image as ImageIcon,
  LogOut,
  MonitorPlay,
  RefreshCcw,
  Settings,
  Shield,
  Upload,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { createEvent, deleteEvent, getEvents } from "@/app/actions/events";
import { createProject, deleteProject, getProjects } from "@/app/actions/projects";
import { createBlogPost, deleteBlogPost, getBlogPosts } from "@/app/actions/blog";
import {
  MASTER_ADMIN_ROLE,
  MID_LEVEL_ADMIN_ROLE,
  ROLE_LABELS,
  getInvitableRoles,
  isMasterAdminRole,
  requiresApproval,
} from "@/lib/admin-roles";
import {
  createDefaultPageSections,
  getBuilderPage,
  getBuilderPages,
  type BuilderFieldDefinition,
  type BuilderFieldValue,
} from "@/lib/site-builder-config";
import { getPublicPagePath } from "@/lib/site-paths";

type DashboardUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  active: boolean;
};

type InviteRecord = {
  id: string;
  email: string;
  role: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
  registrationUrl: string | null;
  invitedBy?: { name: string; email: string };
};

type ManagedUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  active: boolean;
  createdAt: string;
  invitedBy?: { name: string; email: string };
};

type PendingChangeRecord = {
  id: string;
  type: "CREATE" | "UPDATE" | "DELETE";
  resource: "event" | "project" | "blog" | "content" | "siteContent";
  resourceId?: string | null;
  payload: Record<string, unknown>;
  status: "PENDING" | "APPROVED" | "REJECTED";
  note?: string | null;
  createdAt: string;
  reviewedAt?: string | null;
  submittedBy: { name: string; email: string; role: string };
  reviewedBy?: { name: string; email: string } | null;
};

type PendingResult = {
  pending: true;
  message: string;
};

type PageBuilderSections = Record<string, Record<string, BuilderFieldValue>>;

function isPendingResult(value: unknown): value is PendingResult {
  return Boolean(
    value &&
      typeof value === "object" &&
      "pending" in value &&
      "message" in value,
  );
}

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "Not available";
  return new Date(value).toLocaleString();
}

function getChangeSummary(change: PendingChangeRecord) {
  if (change.resource === "siteContent") {
    return `Page Builder: ${String(change.payload.pageId ?? change.resourceId ?? "homepage")}`;
  }

  if (change.resource === "content") {
    return `Page: ${String(change.payload.pageId ?? "homepage")}`;
  }

  if (change.resource === "blog") {
    return String(change.payload.title ?? change.payload.slug ?? change.resourceId ?? "Untitled blog");
  }

  return String(change.payload.title ?? change.resourceId ?? `Pending ${change.resource}`);
}

function getStatusClasses(status: PendingChangeRecord["status"]) {
  if (status === "APPROVED") {
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  }

  if (status === "REJECTED") {
    return "bg-red-50 text-red-700 border border-red-200";
  }

  return "bg-amber-50 text-amber-700 border border-amber-200";
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("content");
  const [currentUser, setCurrentUser] = useState<DashboardUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [events, setEvents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [pendingChanges, setPendingChanges] = useState<PendingChangeRecord[]>([]);
  const [invites, setInvites] = useState<InviteRecord[]>([]);
  const [users, setUsers] = useState<ManagedUser[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingInvite, setIsCreatingInvite] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [latestInviteLink, setLatestInviteLink] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [projectFullDescription, setProjectFullDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectTeam, setProjectTeam] = useState("");
  const [projectFeaturedLink, setProjectFeaturedLink] = useState("");
  const [projectFeaturedLinkLabel, setProjectFeaturedLinkLabel] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [published, setPublished] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<string>(MID_LEVEL_ADMIN_ROLE);

  const [pageId, setPageId] = useState("homepage");
  const [pageSections, setPageSections] = useState<PageBuilderSections>(() => createDefaultPageSections("homepage"));

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const approvalRequired = currentUser ? requiresApproval(currentUser.role) : true;
  const canManageUsers = currentUser ? isMasterAdminRole(currentUser.role) : false;
  const invitableRoles = currentUser ? getInvitableRoles(currentUser.role) : [MID_LEVEL_ADMIN_ROLE];
  const canAccessControlCenter = currentUser ? currentUser.role !== "EDITOR" : false;
  const builderPage = getBuilderPage(pageId);
  const builderPages = getBuilderPages();

  const getPreviewPath = () => {
    if (activeTab === "events") return "/events";
    if (activeTab === "projects") return "/projects";
    if (activeTab === "blogs") return "/blog";
    if (activeTab === "content") return getPublicPagePath(pageId);
    return "/";
  };

  const previewPath = getPreviewPath();

  const showSuccess = (message: string) => {
    setStatusMessage(message);
    setErrorMessage("");
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setStatusMessage("");
  };

  const resetForm = () => {
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
    setProjectFullDescription("");
    setProjectStatus("");
    setProjectTeam("");
    setProjectFeaturedLink("");
    setProjectFeaturedLinkLabel("");
    setLink("");
    setTags("");
    setFile(null);
    setSlug("");
    setExcerpt("");
    setContent("");
    setAuthor("");
    setMetaTitle("");
    setMetaDescription("");
    setPublished(false);
  };

  const updatePageSectionField = (
    sectionKey: string,
    fieldKey: string,
    value: BuilderFieldValue,
  ) => {
    setPageSections((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        [fieldKey]: value,
      },
    }));
  };

  const uploadPageSectionImage = async (sectionKey: string, fieldKey: string, asset: File) => {
    const imageUrl = await uploadImage(asset);
    updatePageSectionField(sectionKey, fieldKey, imageUrl);
    showSuccess("Image uploaded and attached to the page builder.");
  };

  const loadEvents = async () => setEvents(await getEvents());
  const loadProjects = async () => setProjects(await getProjects());
  const loadBlogs = async () => setBlogs(await getBlogPosts());

  const loadContent = async () => {
    const res = await fetch(`/api/admin/site-content/${pageId}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to load page builder content.");
    }
    setPageSections(data.sections || createDefaultPageSections(pageId));
  };

  const loadPendingChanges = async () => {
    const res = await fetch("/api/admin/pending");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch change requests.");
    }
    setPendingChanges(data.changes || []);
  };

  const loadInvites = async () => {
    const res = await fetch("/api/admin/invite");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch invites.");
    }
    setInvites(data.invites || []);
  };

  const loadUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch users.");
    }
    setUsers(data.users || []);
  };

  const refreshControlData = async () => {
    await Promise.all([
      loadPendingChanges(),
      loadInvites(),
      ...(canManageUsers ? [loadUsers()] : []),
    ]);
  };

  useEffect(() => {
    let ignore = false;

    async function authenticate() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          window.location.href = "/admin";
          return;
        }

        const data = await res.json();
        if (!data.user) {
          window.location.href = "/admin";
          return;
        }

        if (!ignore) {
          setCurrentUser(data.user);
          setInviteRole(MID_LEVEL_ADMIN_ROLE);
        }
      } catch {
        if (!ignore) {
          showError("Failed to load your admin session.");
        }
      } finally {
        if (!ignore) {
          setAuthLoading(false);
        }
      }
    }

    void authenticate();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    if (activeTab === "settings" && !canAccessControlCenter) {
      setActiveTab("approvals");
      return;
    }

    if (activeTab === "events") {
      void loadEvents().catch((error: Error) => showError(error.message));
    }
    if (activeTab === "projects") {
      void loadProjects().catch((error: Error) => showError(error.message));
    }
    if (activeTab === "blogs") {
      void loadBlogs().catch((error: Error) => showError(error.message));
    }
    if (activeTab === "content") {
      void loadContent().catch((error: Error) => showError(error.message));
    }
    if (activeTab === "approvals" || activeTab === "settings") {
      void refreshControlData().catch((error: Error) => {
        showError(error.message);
      });
    }
  }, [activeTab, currentUser, pageId, canManageUsers, canAccessControlCenter]);

  useEffect(() => {
    if (activeTab === "content" && iframeRef.current?.contentWindow) {
      // Keep the live preview in sync with the section-based page builder state.
      iframeRef.current.contentWindow.postMessage(
        {
          type: "PREVIEW_SITE_PAGE",
          pageId,
          sections: pageSections,
        },
        "*",
      );
    }
  }, [pageSections, pageId, activeTab]);

  useEffect(() => {
    if (activeTab === "projects" && iframeRef.current?.contentWindow) {
      const imageUrl = file ? URL.createObjectURL(file) : "/images/about/1.jpg";
      iframeRef.current.contentWindow.postMessage(
        {
          type: "PREVIEW_PROJECT",
          payload: {
            title: title || "New Project Title",
            description: description || "Project description...",
            image: imageUrl,
            tags: tags ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : ["Tag 1", "Tag 2"],
          },
        },
        "*",
      );

      return () => {
        if (file) URL.revokeObjectURL(imageUrl);
      };
    }
  }, [title, description, file, tags, activeTab]);

  useEffect(() => {
    if (activeTab === "events" && iframeRef.current?.contentWindow) {
      const imageUrl = file ? URL.createObjectURL(file) : "/events/africa-after-davos.jpeg";
      iframeRef.current.contentWindow.postMessage(
        {
          type: "PREVIEW_EVENT",
          payload: {
            title: title || "New Event Title",
            date: date || "Date/Time Details Here",
            location: location || "Event Location",
            shortDescription: description || "",
            fullDescription: description || "",
            image: imageUrl,
            link: link || "#",
            tags: tags ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : ["Event"],
          },
        },
        "*",
      );

      return () => {
        if (file) URL.revokeObjectURL(imageUrl);
      };
    }
  }, [title, date, location, description, link, file, tags, activeTab]);

  const uploadImage = async (asset: File) => {
    const formData = new FormData();
    formData.append("file", asset);

    const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await uploadRes.json();

    if (!uploadRes.ok) {
      throw new Error(data.error || "Failed to upload image.");
    }

    return data.url as string;
  };

  const handleContentSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/site-content/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: pageSections }),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save page builder content.");
      }

      if (isPendingResult(result)) {
        showSuccess(result.message);
        await loadPendingChanges();
      } else {
        setPageSections(result.sections || pageSections);
        showSuccess(result.message || "Content published successfully.");
      }
    } catch (error) {
      console.error(error);
      showError(error instanceof Error ? error.message : "Failed to save content.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlogSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl: string | null = null;
      if (file) imageUrl = await uploadImage(file);

      const result = await createBlogPost({
        title,
        slug,
        excerpt,
        content,
        image: imageUrl,
        author,
        metaTitle,
        metaDescription,
        published,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      });

      resetForm();

      if (isPendingResult(result)) {
        showSuccess(result.message);
        await loadPendingChanges();
      } else {
        showSuccess("Blog post published successfully.");
        await loadBlogs();
      }
    } catch (error) {
      console.error(error);
      showError("Failed to save blog post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "/events/africa-after-davos.jpeg";
      if (file) imageUrl = await uploadImage(file);

      const result = await createEvent({
        title,
        date,
        location,
        link,
        fullDescription: description,
        image: imageUrl,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      });

      resetForm();

      if (isPendingResult(result)) {
        showSuccess(result.message);
        await loadPendingChanges();
      } else {
        showSuccess("Event published successfully.");
        await loadEvents();
      }
    } catch (error) {
      console.error(error);
      showError("Failed to save event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProjectSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "/images/about/1.jpg";
      if (file) imageUrl = await uploadImage(file);

      const result = await createProject({
        title,
        description,
        fullDescription: projectFullDescription,
        image: imageUrl,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        status: projectStatus,
        team: projectTeam,
        featuredLink: projectFeaturedLink,
        featuredLinkLabel: projectFeaturedLinkLabel,
      });

      resetForm();

      if (isPendingResult(result)) {
        showSuccess(result.message);
        await loadPendingChanges();
      } else {
        showSuccess("Project published successfully.");
        await loadProjects();
      }
    } catch (error) {
      console.error(error);
      showError("Failed to save project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;

    try {
      const result = await deleteEvent(id);
      if (isPendingResult(result)) {
        showSuccess(result.message);
        await loadPendingChanges();
      } else {
        showSuccess("Event deleted successfully.");
        await loadEvents();
      }
    } catch (error) {
      console.error(error);
      showError("Failed to remove event.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;

    try {
      const result = await deleteProject(id);
      if (isPendingResult(result)) {
        showSuccess(result.message);
        await loadPendingChanges();
      } else {
        showSuccess("Project deleted successfully.");
        await loadProjects();
      }
    } catch (error) {
      console.error(error);
      showError("Failed to remove project.");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;

    try {
      const result = await deleteBlogPost(id);
      if (isPendingResult(result)) {
        showSuccess(result.message);
        await loadPendingChanges();
      } else {
        showSuccess("Blog post deleted successfully.");
        await loadBlogs();
      }
    } catch (error) {
      console.error(error);
      showError("Failed to remove blog post.");
    }
  };

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  const handleInviteSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsCreatingInvite(true);

    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create invitation.");
      }

      setLatestInviteLink(data.invite.registrationUrl);
      setInviteEmail("");
      showSuccess(`Invitation created for ${data.invite.email}.`);
      await loadInvites();
    } catch (error) {
      console.error(error);
      showError(error instanceof Error ? error.message : "Failed to create invitation.");
    } finally {
      setIsCreatingInvite(false);
    }
  };

  const copyInviteLink = async () => {
    if (!latestInviteLink) return;

    await navigator.clipboard.writeText(latestInviteLink);
    showSuccess("Invitation link copied.");
  };

  const copySpecificInviteLink = async (inviteUrl: string | null) => {
    if (!inviteUrl) return;

    await navigator.clipboard.writeText(inviteUrl);
    showSuccess("Invite URL copied.");
  };

  const updateManagedUser = async (id: string, payload: { role?: string; active?: boolean }) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update account.");
      }

      showSuccess(`Updated ${data.user.name}.`);
      await loadUsers();
    } catch (error) {
      console.error(error);
      showError(error instanceof Error ? error.message : "Failed to update account.");
    }
  };

  const handlePendingReview = async (changeId: string, action: "approve" | "reject") => {
    const note = window.prompt(
      action === "approve" ? "Optional approval note" : "Optional rejection note",
    );

    try {
      const res = await fetch(`/api/admin/pending/${changeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, note }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to review change.");
      }

      showSuccess(`Change ${action === "approve" ? "approved" : "rejected"}.`);
      await loadPendingChanges();
      if (activeTab === "events") await loadEvents();
      if (activeTab === "projects") await loadProjects();
      if (activeTab === "blogs") await loadBlogs();
      if (activeTab === "content") await loadContent();
    } catch (error) {
      console.error(error);
      showError(error instanceof Error ? error.message : "Failed to review change.");
    }
  };

  const renderBuilderField = (sectionKey: string, field: BuilderFieldDefinition) => {
    const value = pageSections[sectionKey]?.[field.key];

    if (field.type === "textarea") {
      return (
        <textarea
          rows={field.rows || 4}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updatePageSectionField(sectionKey, field.key, event.target.value)}
          placeholder={field.placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
        />
      );
    }

    if (field.type === "list") {
      return (
        <textarea
          rows={field.rows || 5}
          value={Array.isArray(value) ? value.join("\n") : ""}
          onChange={(event) =>
            updatePageSectionField(
              sectionKey,
              field.key,
              event.target.value
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
          placeholder="One item per line"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
        />
      );
    }

    if (field.type === "image") {
      return (
        <div className="space-y-3">
          <input
            type="url"
            value={typeof value === "string" ? value : ""}
            onChange={(event) => updatePageSectionField(sectionKey, field.key, event.target.value)}
            placeholder="Paste an image URL"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
          />
          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Upload image
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={async (event) => {
                  const asset = event.target.files?.[0];
                  if (!asset) return;
                  try {
                    await uploadPageSectionImage(sectionKey, field.key, asset);
                  } catch (error) {
                    console.error(error);
                    showError(error instanceof Error ? error.message : "Failed to upload image.");
                  } finally {
                    event.target.value = "";
                  }
                }}
              />
            </label>
            <span className="text-sm text-gray-500">Use either a direct URL or upload a file.</span>
          </div>
          {typeof value === "string" && value ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <img src={value} alt={field.label} className="h-40 w-full object-cover" />
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <input
        type={field.type === "url" ? "url" : "text"}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => updatePageSectionField(sectionKey, field.key, event.target.value)}
        placeholder={field.placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
      />
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col z-10">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">TADLab Admin</h2>
              <p className="text-sm text-gray-500">Protected content backend</p>
            </div>
          </div>
        </div>

        {currentUser && (
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
            <p className="text-sm text-gray-500 break-all">{currentUser.email}</p>
            <span className="mt-3 inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
              {ROLE_LABELS[currentUser.role] || currentUser.role}
            </span>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: "content", label: "Pages Content", icon: FileText },
            { id: "projects", label: "Projects", icon: BookOpen },
            { id: "blogs", label: "Blogs", icon: FileText },
            { id: "events", label: "Events", icon: Calendar },
            { id: "approvals", label: "Approvals", icon: ClipboardCheck },
            ...(canAccessControlCenter
              ? [{ id: "settings", label: "Control Center", icon: Settings }]
              : []),
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setStatusMessage("");
                  setErrorMessage("");
                  if (item.id !== activeTab) resetForm();
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="w-[520px] xl:w-[640px] shrink-0 p-8 h-screen overflow-y-auto border-r border-gray-200 bg-white">
        {(statusMessage || errorMessage) && (
          <div className="mb-6 space-y-3">
            {statusMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {statusMessage}
              </div>
            )}
            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}
          </div>
        )}

        {activeTab === "content" && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Builder</h1>
                <p className="text-gray-500">
                  {approvalRequired
                    ? "Your section edits will be queued for master approval."
                    : "Master control publishes page builder changes directly."}
                </p>
              </div>
              <select
                value={pageId}
                onChange={(event) => {
                  const nextPageId = event.target.value;
                  setPageId(nextPageId);
                  setPageSections(createDefaultPageSections(nextPageId));
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white"
              >
                {builderPages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              Edit every section on the selected page from here. For image fields, either paste a direct URL or upload an image file.
            </div>

            <div className="space-y-6">
              {builderPage?.sections.map((section) => (
                <div key={section.key} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-700">{section.label}</h3>
                    {section.description ? (
                      <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                    ) : null}
                  </div>
                  <div className="p-6 space-y-6">
                    {section.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                        {renderBuilderField(section.key, field)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleContentSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting
                    ? "Saving..."
                    : approvalRequired
                      ? "Submit Page for Approval"
                      : "Publish Page Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
                <p className="text-gray-500 mt-2">
                  {approvalRequired
                    ? "Project changes require master control approval."
                    : "Master control can publish projects immediately."}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-gray-500" />
                Create New Project
              </h2>
              <form className="space-y-6" onSubmit={handleProjectSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Project Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Tech, Political Change"
                      value={tags}
                      onChange={(event) => setTags(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Full Project Overview</label>
                    <textarea
                      rows={8}
                      value={projectFullDescription}
                      onChange={(event) => setProjectFullDescription(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                      placeholder="Add the detailed project story, objectives, methods, outcomes, or any other content that should appear on the individual project page."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Project Status</label>
                    <input
                      type="text"
                      value={projectStatus}
                      onChange={(event) => setProjectStatus(event.target.value)}
                      placeholder="Active / Ongoing"
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Project Team</label>
                    <input
                      type="text"
                      value={projectTeam}
                      onChange={(event) => setProjectTeam(event.target.value)}
                      placeholder="TADLab Research Division"
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Featured Link</label>
                    <input
                      type="url"
                      value={projectFeaturedLink}
                      onChange={(event) => setProjectFeaturedLink(event.target.value)}
                      placeholder="https://example.com/project-report"
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Featured Link Label</label>
                    <input
                      type="text"
                      value={projectFeaturedLinkLabel}
                      onChange={(event) => setProjectFeaturedLinkLabel(event.target.value)}
                      placeholder="Download Full Report"
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Project Image</label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none p-1">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={(event) => setFile(event.target.files?.[0] || null)}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{file ? file.name : "PNG, JPG up to 5MB"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg disabled:bg-gray-400"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : approvalRequired
                        ? "Submit Project"
                        : "Publish Project"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Live Projects</h3>
              <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
                {projects.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">No projects have been published yet.</div>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900">{project.title}</div>
                        {project.status || project.team ? (
                          <div className="text-xs text-gray-500 mt-1">
                            {[project.status, project.team].filter(Boolean).join(" • ")}
                          </div>
                        ) : null}
                        <div className="text-sm text-gray-500 flex gap-1 mt-1 flex-wrap">
                          {project.tags.map((tag: string) => (
                            <span key={tag} className="bg-gray-200 px-2 py-0.5 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        {approvalRequired ? "Request Delete" : "Delete"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blogs Management</h1>
                <p className="text-gray-500 mt-2">
                  {approvalRequired
                    ? "Blog publishing is routed through master approval."
                    : "Master control publishes blogs directly."}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-gray-500" />
                Create New Blog Post
              </h2>
              <form className="space-y-6" onSubmit={handleBlogSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700">Post Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700">Slug URL (e.g. my-post-title)</label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Excerpt (Short description)</label>
                    <textarea
                      rows={2}
                      required
                      value={excerpt}
                      onChange={(event) => setExcerpt(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Content (Markdown or Text)</label>
                    <textarea
                      rows={8}
                      required
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(event) => setAuthor(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(event) => setTags(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-md font-semibold mt-4 text-gray-800">SEO Settings</h3>
                    <hr className="mb-4" />
                    <label className="text-sm font-medium text-gray-700">Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(event) => setMetaTitle(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black mb-4"
                    />
                    <label className="text-sm font-medium text-gray-700">Meta Description</label>
                    <textarea
                      rows={2}
                      value={metaDescription}
                      onChange={(event) => setMetaDescription(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2 flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={published}
                      onChange={(event) => setPublished(event.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                      Publish immediately when approved
                    </label>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Cover Image</label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none p-1">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={(event) => setFile(event.target.files?.[0] || null)}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{file ? file.name : "PNG, JPG up to 5MB"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg disabled:bg-gray-400"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : approvalRequired
                        ? "Submit Blog"
                        : "Publish Blog"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Live Blogs</h3>
              <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
                {blogs.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">No blog posts have been published yet.</div>
                ) : (
                  blogs.map((blog) => (
                    <div key={blog.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900">{blog.title}</div>
                        <div className="text-sm text-gray-500 flex gap-1 mt-1 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-xs ${
                              blog.published
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {blog.published ? "Published" : "Draft"}
                          </span>
                          {blog.tags.map((tag: string) => (
                            <span key={tag} className="bg-gray-200 px-2 py-0.5 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        {approvalRequired ? "Request Delete" : "Delete"}
                      </button>
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
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
                <p className="text-gray-500 mt-2">
                  {approvalRequired
                    ? "New event changes will be vetted by master control."
                    : "Master control can publish and remove events directly."}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-gray-500" />
                Upload New Event / Flier
              </h2>
              <form className="space-y-6" onSubmit={handleEventSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Event Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Friday, March 6, 2026"
                      required
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      placeholder="Zoom Online Webinar"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Registration Link</label>
                    <input
                      type="url"
                      required
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Webinar, Democracy"
                      value={tags}
                      onChange={(event) => setTags(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Full Description</label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Event Flier</label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none p-1">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={(event) => setFile(event.target.files?.[0] || null)}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{file ? file.name : "PNG, JPG up to 5MB"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg disabled:bg-gray-400"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : approvalRequired
                        ? "Submit Event"
                        : "Publish Event"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Live Events</h3>
              <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
                {events.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">No events have been published yet.</div>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.date}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        {approvalRequired ? "Request Delete" : "Delete"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "approvals" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {canManageUsers ? "Approval Queue" : "My Submitted Changes"}
              </h1>
              <p className="text-gray-500 mt-2">
                {canManageUsers
                  ? "Master control vets mid-level changes before they go live."
                  : "Track the requests you have sent for master review."}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => refreshControlData().catch((error: Error) => showError(error.message))}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCcw className="w-4 h-4" />
                Refresh Queue
              </button>
            </div>

            <div className="space-y-4">
              {pendingChanges.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                  No change requests found.
                </div>
              ) : (
                pendingChanges.map((change) => (
                  <div key={change.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900">{getChangeSummary(change)}</h3>
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(change.status)}`}>
                            {change.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          {change.type} {change.resource} • submitted by {change.submittedBy.name} (
                          {ROLE_LABELS[change.submittedBy.role] || change.submittedBy.role}) on {formatDate(change.createdAt)}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          {change.resource === "content"
                            ? `Target page: ${String(change.payload.pageId ?? "homepage")}`
                            : `Reference: ${String(change.resourceId ?? "new record")}`}
                        </p>
                        {change.note && (
                          <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">
                            Reviewer note: {change.note}
                          </p>
                        )}
                        {change.reviewedBy && change.reviewedAt && (
                          <p className="mt-2 text-sm text-gray-500">
                            Reviewed by {change.reviewedBy.name} on {formatDate(change.reviewedAt)}
                          </p>
                        )}
                      </div>

                      {canManageUsers && change.status === "PENDING" && (
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handlePendingReview(change.id, "approve")}
                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handlePendingReview(change.id, "reject")}
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Control Center</h1>
              <p className="text-gray-500 mt-2">
                Manage invitations, track who has access, and preserve master control of the site.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserPlus className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Invite a New Controller</h2>
              </div>
              <p className="mb-4 text-sm text-gray-500">
                No email will be sent. Create the invite and share the generated URL manually.
              </p>

              <form className="space-y-4" onSubmit={handleInviteSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(event) => setInviteEmail(event.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Access level</label>
                  <select
                    value={inviteRole}
                    onChange={(event) => setInviteRole(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                  >
                    {invitableRoles.map((role) => (
                      <option key={role} value={role}>
                        {ROLE_LABELS[role] || role}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingInvite}
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
                >
                  <UserPlus className="w-4 h-4" />
                  {isCreatingInvite ? "Creating Invite..." : "Create Invite"}
                </button>
              </form>

              {latestInviteLink && (
                <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Latest invite URL</p>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={latestInviteLink}
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
                    />
                    <button
                      onClick={copyInviteLink}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <ClipboardCheck className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Invitations</h2>
              </div>

              <div className="space-y-3">
                {invites.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                    No invitations found.
                  </div>
                ) : (
                  invites.map((invite) => (
                    <div key={invite.id} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-gray-900">{invite.email}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            {ROLE_LABELS[invite.role] || invite.role} • invited by {invite.invitedBy?.name || "Unknown"}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Created {formatDate(invite.createdAt)} • Expires {formatDate(invite.expiresAt)}
                          </p>
                          {invite.registrationUrl && (
                            <div className="mt-3 flex gap-2">
                              <input
                                readOnly
                                value={invite.registrationUrl}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
                              />
                              {!invite.used && (
                                <button
                                  onClick={() => copySpecificInviteLink(invite.registrationUrl)}
                                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                  <Copy className="w-4 h-4" />
                                  Copy
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            invite.used
                              ? "bg-gray-100 text-gray-700 border border-gray-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {invite.used ? "Used" : "Open"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {canManageUsers && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-semibold text-gray-900">Access Management</h2>
                </div>

                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500 break-all">{user.email}</p>
                          <div className="mt-2 flex items-center gap-2 flex-wrap">
                            <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                              {ROLE_LABELS[user.role] || user.role}
                            </span>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                user.active
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {user.active ? "Active" : "Disabled"}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Created {formatDate(user.createdAt)}
                            {user.invitedBy ? ` • Invited by ${user.invitedBy.name}` : ""}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          {user.role !== MASTER_ADMIN_ROLE && (
                            <button
                              onClick={() => updateManagedUser(user.id, { role: MASTER_ADMIN_ROLE })}
                              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Make Master Control
                            </button>
                          )}
                          {user.role !== MID_LEVEL_ADMIN_ROLE && (
                            <button
                              onClick={() => updateManagedUser(user.id, { role: MID_LEVEL_ADMIN_ROLE })}
                              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Make Mid-Level
                            </button>
                          )}
                          <button
                            onClick={() => updateManagedUser(user.id, { active: !user.active })}
                            className={`rounded-lg px-4 py-2 text-sm font-medium ${
                              user.active
                                ? "bg-red-50 text-red-700 hover:bg-red-100"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            {user.active ? "Deactivate Access" : "Reactivate Access"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 bg-gray-100 h-screen flex flex-col relative overflow-hidden hidden md:flex">
        <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-2">
            <MonitorPlay className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Live Draft Preview <span className="text-gray-400 font-normal">({previewPath})</span>
            </span>
          </div>
          <button
            onClick={() => {
              if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
            }}
            className="text-xs bg-gray-50 text-gray-600 border px-3 py-1.5 rounded shadow-sm hover:bg-gray-100 transition-colors"
          >
            Hard Refresh Frame
          </button>
        </div>
        <div className="flex-1 relative bg-white">
          <iframe
            key={previewPath}
            ref={iframeRef}
            src={previewPath}
            className="absolute inset-0 w-full h-full border-none shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}
