import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteById} from "../../queries/QueryService";

export default function useDeleteUser(getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			return await deleteById("http://localhost:8090/api/v1/user/" + id, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["user-to-remove-list"]})
			return data
		}
	})
}