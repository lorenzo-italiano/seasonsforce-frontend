import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getAll, patch} from "../../queries/QueryService";

interface completeName {
	firstname: string
	lastname: string
}

export default function useFetchUserIdByFirstnameLastname(getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	const searchByFirstnameAndLastname = useMutation({
		mutationFn: async (data: completeName) => {
			return await getAll("http://localhost:8090/api/v1/user/search?firstName=" + data.firstname + "&lastName=" + data.lastname, getValidToken);
		}
	})

	const searchByFirstname = useMutation({
		mutationFn: async (data: string) => {
			return await getAll("http://localhost:8090/api/v1/user/search?firstName=" + data, getValidToken);
		}
	})

	const searchByLastname = useMutation({
		mutationFn: async (data: string) => {
			return await getAll("http://localhost:8090/api/v1/user/search?lastName=" + data, getValidToken);
		}
	})

	return {
		searchByFirstnameAndLastname,
		searchByFirstname,
		searchByLastname
	}
}