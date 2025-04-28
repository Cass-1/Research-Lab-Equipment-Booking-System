"use server";

import { ReservationStatus } from "@prisma/client";
import { prisma } from "../_lib/prisma";
type EquipmentFormData = {
    equipmentId: string,
    userId: string,
    date: Date,
    status: ReservationStatus,
    labId: string
}
export default async function CreateReservation(formData: FormData): Promise<boolean>{
    const rawData: EquipmentFormData = {
        equipmentId: formData.get("equipmentId")!.toString(),
        userId: formData.get("userId") as string,
        date: new Date(formData.get("date")!.toString()),
        status: formData.get("status") as ReservationStatus,
        labId: formData.get("labId")!.toString()
    }
    const previousReservations = await prisma.reservations.findMany({
        where:{
            equipmentId: rawData.equipmentId,
            date: rawData.date
        }
    })
    if (previousReservations.length > 0 ){
        return false;
    }else{
        await prisma.reservations.create({
            data: {
                equipmentId: rawData.equipmentId,
                userId: rawData.userId,
                date: rawData.date,
                status: rawData.status,
                labId: rawData.labId
            },
        });
        return true;
    }
    

}