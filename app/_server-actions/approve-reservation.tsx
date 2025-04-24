"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

export default async function ApproveReservation(reservationId: string, path: string){
    await prisma.reservations.update({
        where:{
            id: reservationId
        },
        data: {
            approved: true
        }
    })

    revalidatePath(path);
}