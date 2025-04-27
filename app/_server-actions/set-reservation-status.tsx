"use server";

import { ApprovalStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";

export default async function SetReservationStatus(reservationId: string, approvalStatus: ApprovalStatus){
    await prisma.reservations.update({
        where:{
            id: reservationId
        },
        data: {
            status: approvalStatus
        }
    })
}