"use server";
import { Prisma, ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";

export type ReservationWithForeignKeys = Prisma.ReservationsGetPayload<{
    select:{
        id: true,
        date: true,
        equipment: {
            select:{
                name:true
            }
        },
        lab:{
            select:{
                name:true
            }
        }
    }
}>;

export default async function GetReservations(activeTab: ReservationStatus, specificUser?: string, specificLab?:string): Promise<ReservationWithForeignKeys[]>{
    return await prisma.reservations.findMany({
        where: {
            ...(specificUser ? {userId: specificUser}:{}),
            ...(specificLab ? {labId: specificLab}:{})
        },
        select:{
            id: true,
            date: true,
            equipment: {
                select:{
                    name:true
                }
            },
            lab:{
                select:{
                    name:true
                }
            }
        }
    });
}