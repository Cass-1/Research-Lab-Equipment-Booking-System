import createReservation from "../_server-actions/create-reservation";

export default function CreateReservation(params: {equipmentId: string, userId: string}){

    return (
    <form action={createReservation}>
        <input name="equipmentId" type="hidden" value={params.equipmentId}/>
        <input name="approved" type="hidden" value="false"/>
        <input name="userId" type="hidden" value={params.userId}/>
        <input name="date" required={true} type="date"/>
        <button type="submit">Submit</button>
    </form>);
}