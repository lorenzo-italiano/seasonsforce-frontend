import {useQuery} from "@tanstack/react-query";
import {post} from "../../queries/QueryService";

export default function useNotificationSSE(receiverId: string, getValidToken: () => Promise<string>) {

	return useQuery({
		queryKey: ["notification-sse-proxy", receiverId],
		queryFn: async (): Promise<EventSource> => {
			const uniqueToken = await post("http://localhost:8090/api/v1/notification/sse/proxy/" + receiverId, {}, getValidToken);
			return new EventSource("http://localhost:8090/api/v1/notification/sse/subscribe/" + uniqueToken)
		},
		enabled: !!receiverId
	});
}