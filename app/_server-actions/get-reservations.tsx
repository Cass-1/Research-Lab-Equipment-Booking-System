"use server";
import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";

export default async function GetReservations(activeTab: ReservationStatus, specificUser?: string){
    return await prisma.reservations.findMany({
        where: {
            approved: activeTab,
            ...(specificUser ? {userId: specificUser}:{})
        }
    });
}