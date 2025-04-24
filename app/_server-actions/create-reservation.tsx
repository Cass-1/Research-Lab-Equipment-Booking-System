"use server";

import { prisma } from "../_lib/prisma";
type EquipmentFormData = {
    equipmentId: string,
    userId: string,
    date: Date,
    approved: boolean,
    labId: string
}
export default async function CreateReservation(formData: FormData): Promise<boolean>{
    const rawData: EquipmentFormData = {
        equipmentId: formData.get("equipmentId")!.toString(),
        userId: formData.get("userId") as string,
        date: new Date(formData.get("date")!.toString()),
        approved: formData.get("approved")?.toString().toLocaleLowerCase() === "true",
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
                approved: rawData.approved,
                labId: rawData.labId
            },
        });
        return true;
    }
    

}