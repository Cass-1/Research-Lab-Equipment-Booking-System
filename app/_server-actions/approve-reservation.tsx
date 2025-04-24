"use server";

import { prisma } from "../_lib/prisma";

export default async function ApproveReservation(reservationId: string, value: boolean){
    await prisma.reservations.update({
        where:{
            id: reservationId
        },
        data: {
            approved: value
        }
    })
}