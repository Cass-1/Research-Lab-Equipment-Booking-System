"use server";

import { prisma } from "../_lib/prisma";
type EquipmentFormData = {
    equipmentId: string,
    userId: string,
    date: Date,
    approved: boolean,
}
export default async function CreateReservation(formData: FormData): Promise<boolean>{
    const rawData: EquipmentFormData = {
        equipmentId: formData.get("equipmentId")!.toString(),
        userId: formData.get("userId")!.toString(),
        date: new Date(formData.get("date")!.toString()),
        approved: formData.get("approved")?.toString().toLocaleLowerCase() === "true"
    }
    const previousReservations = await prisma.reservations.findMany({
        where:{
            equipmentId: rawData.equipmentId,
            date: rawData.date
        }
    })
    if (previousReservations){
        return false;
    }else{
        await prisma.reservations.create({
            data: {
                equipmentId: rawData.equipmentId,
                userId: rawData.userId,
                date: rawData.date,
                approved: rawData.approved
            },
        });
        return true;
    }
    

}