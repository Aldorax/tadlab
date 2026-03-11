import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, generateToken } from "@/lib/auth";
import {
    canInviteRole,
    getInvitableRoles,
    normalizeAdminEmail,
    isMasterAdminRole,
} from "@/lib/admin-roles";

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (getInvitableRoles(user.role).length === 0) {
            return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
        }

        const { email, role } = await req.json();

        if (!email || !role) {
            return NextResponse.json({ error: "Email and role are required." }, { status: 400 });
        }

        if (!canInviteRole(user.role, role)) {
            const allowedRoles = getInvitableRoles(user.role).join(" or ");
            return NextResponse.json(
                { error: `Invalid role for your account. You can only invite ${allowedRoles}.` },
                { status: 403 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.adminUser.findUnique({
            where: { email: normalizeAdminEmail(email) },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "A user with this email already exists." },
                { status: 400 }
            );
        }

        // Check for existing unused invite
        const existingInvite = await prisma.adminInvite.findFirst({
            where: {
                email: normalizeAdminEmail(email),
                used: false,
                expiresAt: { gt: new Date() },
            },
        });

        if (existingInvite) {
            return NextResponse.json(
                { error: "An active invitation already exists for this email." },
                { status: 400 }
            );
        }

        const token = generateToken();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        const invite = await prisma.adminInvite.create({
            data: {
                email: normalizeAdminEmail(email),
                role,
                token,
                expiresAt,
                invitedById: user.id,
            },
        });

        // Build the registration URL
        const baseUrl = req.nextUrl.origin;
        const registrationUrl = `${baseUrl}/admin/register?token=${token}`;

        return NextResponse.json({
            success: true,
            invite: {
                id: invite.id,
                email: invite.email,
                role: invite.role,
                registrationUrl,
                expiresAt: invite.expiresAt,
            },
        });
    } catch (error: any) {
        console.error("Invite error:", error);
        return NextResponse.json({ error: "Failed to create invitation." }, { status: 500 });
    }
}

// GET: List all invites (for admin view)
export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user || getInvitableRoles(user.role).length === 0) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const invites = await prisma.adminInvite.findMany({
            where: isMasterAdminRole(user.role) ? undefined : { invitedById: user.id },
            orderBy: { createdAt: "desc" },
            include: {
                invitedBy: { select: { name: true, email: true } },
            },
        });

        return NextResponse.json({ invites });
    } catch (error: any) {
        console.error("List invites error:", error);
        return NextResponse.json({ error: "Failed to fetch invites." }, { status: 500 });
    }
}
