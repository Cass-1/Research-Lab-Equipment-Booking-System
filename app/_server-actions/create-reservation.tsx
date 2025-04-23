"use server";

import { prisma } from "../_lib/prisma";

type EquipmentFormData = {
    equipmentId: string,
    userId: string,
    date: Date,
    approved: boolean
}
export default async function CreateReservation(formData: FormData){
    const rawData: EquipmentFormData = {
        equipmentId: formData.get("equipmentId")?.toString() ?? "",
        userId: formData.get("userId")?.toString() ?? "",
        date: formData.get("date")?.valueOf(),
        approved: formData.get("approved")?.toString().toLocaleLowerCase() === "true"

    }
    console.log("hello world");
    console.log(formData.get("date")?.valueOf());

    await prisma.reservations.create({
        data: {
            equipmentId: rawData.equipmentId,
            userId: rawData.userId,
            date: rawData.date,
            approved: rawData.approved
        },
    });

}