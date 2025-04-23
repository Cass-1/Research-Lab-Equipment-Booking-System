"use server";

import { error } from "console";
import { prisma } from "../_lib/prisma";

type EquipmentFormData = {
    equipmentId: string,
    userId: string,
    date: Date,
    approved: boolean
}
export default async function CreateReservation(formData: FormData){
    const rawData: EquipmentFormData = {
        equipmentId: formData.get("equipmentId")!.toString(),
        userId: formData.get("userId")!.toString(),
        date: new Date(formData.get("date")!.toString()),
        approved: formData.get("approved")?.toString().toLocaleLowerCase() === "true"
    }
    await prisma.reservations.create({
        data: {
            equipmentId: rawData.equipmentId,
            userId: rawData.userId,
            date: rawData.date,
            approved: rawData.approved
        },
    });

}