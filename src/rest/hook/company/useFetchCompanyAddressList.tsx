import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";
import {Address} from "../../../model/Address";

export default function useFetchCompanyAddressList(id: string, getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["address-list-company", id],
		// TODO put real type and create type
		queryFn: async (): Promise<Address[]> => {
			return await getAll("http://localhost:8090/api/v1/company/address-list/" + id, getValidToken);
		},
		enabled: !!id
	})
}