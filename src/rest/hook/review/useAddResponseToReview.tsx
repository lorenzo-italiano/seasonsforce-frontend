import {useMutation, useQueryClient} from "@tanstack/react-query";
import {post} from "../../queries/QueryService";

export default function useAddResponseToReview(userId: string, reviewId: string, getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation<String, Error, Object>({
		mutationFn: async (data) => {
			return await post("http://localhost:8090/api/v1/review/add/response/" + reviewId, data, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			await queryClient.invalidateQueries({ queryKey: ["user-detailed", userId]})
			return data
		}
	})
}