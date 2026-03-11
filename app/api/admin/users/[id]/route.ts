import { NextRequest, NextResponse } from "next/server";
import type { AdminRole } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {
    MASTER_ADMIN_ROLE,
    MID_LEVEL_ADMIN_ROLE,
    isMasterAdminRole,
} from "@/lib/admin-roles";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user || !isMasterAdminRole(user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { role, active } = await req.json();

        // Can't modify yourself
        if (id === user.id) {
            return NextResponse.json(
                { error: "You cannot modify your own account here." },
                { status: 400 }
            );
        }

        const existingUser = await prisma.adminUser.findUnique({
            where: { id },
            select: { id: true, role: true, active: true },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const updateData: { role?: AdminRole; active?: boolean } = {};
        if (role !== undefined && [MASTER_ADMIN_ROLE, MID_LEVEL_ADMIN_ROLE].includes(role)) {
            updateData.role = role;
        }
        if (active !== undefined) {
            updateData.active = active;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: "No valid changes were provided." }, { status: 400 });
        }

        const currentActiveSuperAdminCount = await prisma.adminUser.count({
            where: { role: MASTER_ADMIN_ROLE, active: true },
        });

        const isLastActiveSuperAdmin =
            existingUser.role === MASTER_ADMIN_ROLE &&
            existingUser.active &&
            currentActiveSuperAdminCount === 1;

        if (
            isLastActiveSuperAdmin &&
            ((updateData.role && updateData.role !== MASTER_ADMIN_ROLE) || updateData.active === false)
        ) {
            return NextResponse.json(
                { error: "You cannot remove or deactivate the last active master control account." },
                { status: 400 }
            );
        }

        const updated = await prisma.adminUser.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                active: true,
            },
        });

        return NextResponse.json({ success: true, user: updated });
    } catch (error: any) {
        console.error("Update user error:", error);
        return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
    }
}
