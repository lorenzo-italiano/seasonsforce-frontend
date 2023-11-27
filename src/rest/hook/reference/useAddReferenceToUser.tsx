import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patch} from "../../queries/QueryService";

export default function useAddReferenceToUser(userId: string, getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation<String, Error, Object>({
		mutationFn: async (data) => {
			return await patch("http://localhost:8090/api/v1/user/reference/add/" + userId, data, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			await queryClient.invalidateQueries({ queryKey: ["user-detailed", userId]})
			return data
		}
	})
}