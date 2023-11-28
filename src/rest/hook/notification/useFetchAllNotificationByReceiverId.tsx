import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";
import {Notification} from "../../../model/notification/Notification";

export default function useFetchAllNotificationByReceiverId(receiverId: string, getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["notification-list-by-receiver", receiverId],
		queryFn: async (): Promise<Notification[]> => {
			return await getAll("http://localhost:8090/api/v1/notification/user/" + receiverId, getValidToken);
		},
		enabled: !!receiverId
	})

}