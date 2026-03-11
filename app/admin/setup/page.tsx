"use client";

import { useState, useEffect } from "react";
import { Lock, User, Shield, ArrowRight } from "lucide-react";

export default function AdminSetup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [setupEmail, setSetupEmail] = useState("");

    useEffect(() => {
        fetch("/api/auth/setup")
            .then((res) => res.json())
            .then((data) => {
                if (data.setupComplete) {
                    window.location.href = "/admin";
                    return;
                }
                setSetupEmail(data.email);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to check setup status.");
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const res = await fetch("/api/auth/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password, confirmPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Setup failed.");
                return;
            }

            window.location.href = "/admin/dashboard";
        } catch {
            setError("Setup failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                        <Shield className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Initial Setup
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Create the first Master Control account for TADLab
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg border border-gray-100 sm:rounded-2xl sm:px-10">
                    <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800">
                            <strong>Note:</strong> This setup is a one-time process. The master control account
                            will be created for <strong>{setupEmail}</strong>.
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
                                    value={setupEmail}
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
                                <>Create Master Control Account <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
