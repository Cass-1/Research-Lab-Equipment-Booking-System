"use server";
import { prisma } from "../_lib/prisma";

export default async function FindReservations(labId: string){
    return await prisma.reservations.findMany({
        where:{
          labId: labId,
          approved: false
        },
        include:{
          user: true,
          equipment: true
        }
      })
}