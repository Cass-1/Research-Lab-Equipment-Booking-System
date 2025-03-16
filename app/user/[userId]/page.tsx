export default async function UserIdPage({params}:{params:Promise<{userId:string}>}){
    const {userId} = await params;
    return(
        <h1>Hello user {userId}!</h1>
    )

}