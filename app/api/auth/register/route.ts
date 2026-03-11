import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";
import { normalizeAdminEmail } from "@/lib/admin-roles";

export async function POST(req: NextRequest) {
    try {
        const { token, name, password, confirmPassword } = await req.json();

        if (!token || !name || !password || !confirmPassword) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters." },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "Passwords do not match." },
                { status: 400 }
            );
        }

        // Find the invite
        const invite = await prisma.adminInvite.findUnique({
            where: { token },
        });

        if (!invite) {
            return NextResponse.json(
                { error: "Invalid invitation link." },
                { status: 400 }
            );
        }

        if (invite.used) {
            return NextResponse.json(
                { error: "This invitation has already been used." },
                { status: 400 }
            );
        }

        if (invite.expiresAt < new Date()) {
            return NextResponse.json(
                { error: "This invitation has expired. Request a new one." },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existing = await prisma.adminUser.findUnique({
            where: { email: normalizeAdminEmail(invite.email) },
        });

        if (existing) {
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 400 }
            );
        }

        const passwordHash = await hashPassword(password);

        // Create the user and mark the invite as used in a transaction
        const user = await prisma.$transaction(async (tx) => {
            const newUser = await tx.adminUser.create({
                data: {
                    email: normalizeAdminEmail(invite.email),
                    name,
                    passwordHash,
                    role: invite.role,
                    active: true,
                    invitedById: invite.invitedById,
                },
            });

            await tx.adminInvite.update({
                where: { id: invite.id },
                data: { used: true },
            });

            return newUser;
        });

        await createSession(user.id);

        return NextResponse.json({
            success: true,
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Registration failed." },
            { status: 500 }
        );
    }
}

// GET: Validate an invite token
export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "Token is required." }, { status: 400 });
    }

    const invite = await prisma.adminInvite.findUnique({
        where: { token },
    });

    if (!invite || invite.used || invite.expiresAt < new Date()) {
        return NextResponse.json(
            { valid: false, error: "Invalid or expired invitation." },
            { status: 400 }
        );
    }

    return NextResponse.json({
        valid: true,
        email: invite.email,
        role: invite.role,
    });
}
