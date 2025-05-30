"use server";
import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";

export default async function FindPendingReservations(labId: string){
    return await prisma.reservations.findMany({
        where:{
          labId: labId,
          status: ReservationStatus.PENDING
        },
        include:{
          user: true,
          equipment: true
        }
      })
}