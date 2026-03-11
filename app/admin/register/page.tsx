"use client";

import { useState, useEffect } from "react";
import { Lock, User, Shield, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AdminRegister() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [inviteInfo, setInviteInfo] = useState<{ email: string; role: string } | null>(null);

    useEffect(() => {
        if (!token) {
            setError("No invitation token provided.");
            setLoading(false);
            return;
        }

        fetch(`/api/auth/register?token=${token}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.valid) {
                    setError(data.error || "Invalid or expired invitation.");
                } else {
                    setInviteInfo({ email: data.email, role: data.role });
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to validate invitation.");
                setLoading(false);
            });
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, name, password, confirmPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed.");
                return;
            }

            window.location.href = "/admin/dashboard";
        } catch {
            setError("Registration failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Validating invitation...</div>
            </div>
        );
    }

    if (!inviteInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-lg border border-gray-100 sm:rounded-2xl sm:px-10">
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                            <p className="text-sm text-red-700">{error || "Invalid invitation."}</p>
                        </div>
                        <div className="text-center mt-4">
                            <a href="/admin" className="text-sm font-medium text-black hover:text-gray-600">
                                Go to login →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const roleLabels: Record<string, string> = {
        SUPER_ADMIN: "Master Control",
        ADMIN: "Mid-Level Control",
        EDITOR: "Editor",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                        <Shield className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Join TADLab Admin
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    You&apos;ve been invited as {roleLabels[inviteInfo.role] || inviteInfo.role}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg border border-gray-100 sm:rounded-2xl sm:px-10">
                    <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-sm text-emerald-800">
                            Creating account for <strong>{inviteInfo.email}</strong> with
                            role <strong>{roleLabels[inviteInfo.role]}</strong>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={inviteInfo.email}
                                    disabled
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg px-4 py-2.5 border bg-gray-50 text-gray-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg px-4 py-2.5 border focus:ring-black focus:border-black"
                                    placeholder="Your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg px-4 py-2.5 border focus:ring-black focus:border-black"
                                    placeholder="Min 8 characters"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg px-4 py-2.5 border focus:ring-black focus:border-black"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:bg-gray-400"
                        >
                            {submitting ? "Creating Account..." : (
                                <>Create Account & Sign In <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
