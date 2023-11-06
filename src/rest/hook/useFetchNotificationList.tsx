import {useQuery} from "@tanstack/react-query";
import {getAll} from "../queries/QueryService";

export default function useFetchNotificationList() {
    return useQuery({
        queryKey: ["notification-list"],
        queryFn: async (): Promise<number> => {
            return await getAll("http://localhost:8080/api/v1/notification/");
        }
    })

}