"use server";

import { prisma } from "../_lib/prisma";

export default async function GetReservations(labId: string, approvedReservations: boolean, notApprovedReservations: boolean){
    const allReservations = [];
    if (approvedReservations){
        const reservations = await prisma.reservations.findMany({
            where:{
                labId: labId,
                approved: true
            },
            include:{
                equipment: true,
                user: true
            }
        });
        allReservations.push(...reservations);
    }
    if (notApprovedReservations){
        const reservations = await prisma.reservations.findMany({
            where:{
                labId: labId,
                approved: false
            },
            include:{
                equipment: true,
                user: true
            }
        });
        allReservations.push(...reservations)
    }
    return allReservations;
}