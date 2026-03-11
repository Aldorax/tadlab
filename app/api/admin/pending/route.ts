import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isMasterAdminRole } from "@/lib/admin-roles";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Editors can only see their own pending changes
        // Admins and Super Admins can see all
        const where = isMasterAdminRole(user.role)
            ? {}
            : { submittedById: user.id };

        const changes = await prisma.pendingChange.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                submittedBy: { select: { name: true, email: true, role: true } },
                reviewedBy: { select: { name: true, email: true } },
            },
        });

        return NextResponse.json({ changes });
    } catch (error: any) {
        console.error("List pending changes error:", error);
        return NextResponse.json({ error: "Failed to fetch pending changes." }, { status: 500 });
    }
}
