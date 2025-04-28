"use server";

import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";
import { auth } from "../../auth";
import logUsage from "./log-usage";

export default async function UpdateReservationStatus(activeTab: ReservationStatus, reservationIds: string[]) {
    await prisma.reservations.updateMany({
        where: {
            id: { in: reservationIds }
        },
        data: {
            status: activeTab // Update status field
        }
    });

    // Log each reservation status change
    if (activeTab === ReservationStatus.APPROVED || activeTab === ReservationStatus.REJECTED) {
        const session = await auth();
        const approverUserId = session?.user?.id;

        if (!approverUserId) {
            throw new Error("User not authenticated");
        }

        // Log each reservation individually
        for (const reservationId of reservationIds) {
            await logUsage(reservationId, approverUserId);
        }
    }
}