import {useMutation, useQueryClient} from "@tanstack/react-query";
import {post} from "../../queries/QueryService";

export default function useCreateAddress(getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	return useMutation<String, Error, Object>({
		mutationFn: async (address: Object) => {
			return await post("http://localhost:8090/api/v1/address/", address, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["address"]})
			return data
		}
	})
}