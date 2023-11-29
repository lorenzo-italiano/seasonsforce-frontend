import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patch} from "../../queries/QueryService";

interface Params {
	userId: string
	review: Object
}

export default function useCreateReview(getValidToken: () => Promise<string>) {
	// const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: Params) => {
			return await patch("http://localhost:8090/api/v1/user/review/add/" + params.userId, params.review, getValidToken);
		},
		onSuccess: async (data) => {
			// TODO invalidate queries for get userById & get user list
			// await queryClient.invalidateQueries({ queryKey: ["user-to-remove-list"]})
			return data
		}
	})
}