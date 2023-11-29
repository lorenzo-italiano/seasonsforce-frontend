import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patch} from "../../queries/QueryService";

export default function usePatchReview(review: Object, getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation<String, Error, Object>({
		mutationFn: async (data) => {
			return await patch("http://localhost:8090/api/v1/review/" + review.id, data, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			await queryClient.invalidateQueries({ queryKey: ["user-detailed", review.user.id]})
			await queryClient.invalidateQueries({ queryKey: ["user-detailed", review.sender.id]})
			return data
		}
	})
}