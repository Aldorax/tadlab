import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isMasterAdminRole } from "@/lib/admin-roles";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user || !isMasterAdminRole(user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const users = await prisma.adminUser.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                active: true,
                createdAt: true,
                invitedBy: { select: { name: true, email: true } },
            },
        });

        return NextResponse.json({ users });
    } catch (error: any) {
        console.error("List users error:", error);
        return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
    }
}
