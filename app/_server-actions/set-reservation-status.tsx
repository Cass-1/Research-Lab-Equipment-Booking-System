"use server";

import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";
import { auth } from "../../auth";
import logUsage from "./log-usage";

export default async function SetReservationStatus(reservationId: string, approvalStatus: ReservationStatus) {
    await prisma.reservations.update({
        where: {
            id: reservationId
        },
        data: {
            status: approvalStatus // Update status field
        }
    });

    // Log each reservation status change
    if (approvalStatus === ReservationStatus.APPROVED || approvalStatus === ReservationStatus.REJECTED) {
        const session = await auth();
        const approverUserId = session?.user?.id;

        if (!approverUserId) {
            throw new Error("User not authenticated");
        }

        await logUsage(reservationId, approverUserId);
    }
}