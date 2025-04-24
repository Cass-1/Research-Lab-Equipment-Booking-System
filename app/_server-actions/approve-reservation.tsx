"use server";

import { prisma } from "../_lib/prisma";

export default async function ApproveReservation(reservationId: string){
    await prisma.reservations.update({
        where:{
            id: reservationId
        },
        data: {
            approved: true
        }
    })
}