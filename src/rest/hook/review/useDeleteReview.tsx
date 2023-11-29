import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patch} from "../../queries/QueryService";

export default function useDeleteReview(userId: string, review: Object, getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation<String, Error, Object>({
		mutationFn: async () => {
			return await patch("http://localhost:8090/api/v1/user/review/remove/" + userId, { "id": review.id }, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			await queryClient.invalidateQueries({ queryKey: ["user-detailed", userId]})
			await queryClient.invalidateQueries({ queryKey: ["user-detailed", review.sender.id]})
			return data
		}
	})
}