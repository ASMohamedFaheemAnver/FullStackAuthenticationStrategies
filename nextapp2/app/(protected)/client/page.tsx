"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";


const Client =  () => {
    const user = useCurrentUser();
    return ( 
        <UserInfo 
        user={user} 
        lable="Client Component" 
        />
    );
}
 
export default Client;