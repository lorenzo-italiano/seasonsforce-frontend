import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postWithoutAuth} from "../../queries/QueryService";

export default function useRegisterUser() {
	const queryClient = useQueryClient();

	return useMutation<Object, Error, Object>({
		mutationFn: async (user: Object) => {
			return await postWithoutAuth("http://localhost:8090/api/v1/user/auth/register", user);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user"]})
			return data
		}
	})
}