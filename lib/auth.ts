import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { MASTER_ADMIN_ROLE, isMasterAdminRole } from "@/lib/admin-roles";

const SESSION_COOKIE_NAME = "tadlab_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Password Utilities ─────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// ─── Session Management ─────────────────────────────────────────────

export function generateToken(): string {
    return crypto.randomBytes(48).toString("hex");
}

export async function createSession(userId: string) {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    const session = await prisma.adminSession.create({
        data: { token, userId, expiresAt },
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
    });

    return session;
}

export async function destroySession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
        await prisma.adminSession.deleteMany({ where: { token } });
        cookieStore.delete(SESSION_COOKIE_NAME);
    }
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) return null;

    const session = await prisma.adminSession.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
        if (session) {
            await prisma.adminSession.delete({ where: { id: session.id } });
        }
        return null;
    }

    if (!session.user.active) return null;

    return session.user;
}

// ─── Role-Based Helpers ─────────────────────────────────────────────

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("UNAUTHORIZED");
    }
    return user;
}

export async function requireSuperAdmin() {
    const user = await requireAuth();
    if (!isMasterAdminRole(user.role)) {
        throw new Error("FORBIDDEN");
    }
    return user;
}

export function isSuperAdmin(user: { role: string }) {
    return isMasterAdminRole(user.role);
}

// ─── Setup Check ────────────────────────────────────────────────────

export async function isSetupComplete(): Promise<boolean> {
    const count = await prisma.adminUser.count();
    return count > 0;
}

export const INITIAL_SUPER_ADMIN_EMAIL = "omoebun52@gmail.com";
export { MASTER_ADMIN_ROLE };
