"use server";

import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";

export default async function logUsage(
    reservationId: string,
    approvedById: string
): Promise<void> {
    const reservation = await prisma.reservations.findUnique({
        where: { id: reservationId }
    });

    if (!reservation) {
        throw new Error(`Reservation with ID ${reservationId} not found`);
    }

    await prisma.usageLog.create({
        data: {
            equipmentId: reservation.equipmentId,
            labId: reservation.labId,
            reservationId: reservation.id,
            requestedById: reservation.userId,
            approvedById: approvedById,
            status: reservation.status // Log the status field
        }
    });
}