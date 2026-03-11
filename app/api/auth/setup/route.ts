import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
    hashPassword,
    createSession,
    isSetupComplete,
    INITIAL_SUPER_ADMIN_EMAIL,
} from "@/lib/auth";
import { MASTER_ADMIN_ROLE } from "@/lib/admin-roles";

export async function POST(req: NextRequest) {
    try {
        // Check if setup is already complete
        const setupDone = await isSetupComplete();
        if (setupDone) {
            return NextResponse.json(
                { error: "Setup already completed. Super admin account exists." },
                { status: 403 }
            );
        }

        const { name, password, confirmPassword } = await req.json();

        if (!name || !password || !confirmPassword) {
            return NextResponse.json(
                { error: "Name, password, and confirm password are required." },
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

        const passwordHash = await hashPassword(password);

        const user = await prisma.adminUser.create({
            data: {
                email: INITIAL_SUPER_ADMIN_EMAIL,
                name,
                passwordHash,
                role: MASTER_ADMIN_ROLE,
                active: true,
            },
        });

        await createSession(user.id);

        return NextResponse.json({
            success: true,
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch (error: any) {
        console.error("Setup error:", error);
        return NextResponse.json(
            { error: "Failed to complete setup." },
            { status: 500 }
        );
    }
}

export async function GET() {
    const setupDone = await isSetupComplete();
    return NextResponse.json({ setupComplete: setupDone, email: INITIAL_SUPER_ADMIN_EMAIL });
}
