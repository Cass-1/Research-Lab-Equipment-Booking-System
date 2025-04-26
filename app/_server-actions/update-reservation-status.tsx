"use server";

import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";

export default async function UpdateReservationStatus(activeTab: ReservationStatus, reservationIds: string[]){
    await prisma.reservations.findMany({
        where: {
            approved: activeTab,
            id: {in: reservationIds}
        }
    });
}