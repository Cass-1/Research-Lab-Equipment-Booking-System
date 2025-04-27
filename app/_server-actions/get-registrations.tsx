"use server";
import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";

export default async function GetReservations(labId: string, approvalStatus: ReservationStatus){
        return await prisma.reservations.findMany({
            where:{
                labId: labId,
            },
            include:{
                equipment: true,
                user: true
            }
        });
}