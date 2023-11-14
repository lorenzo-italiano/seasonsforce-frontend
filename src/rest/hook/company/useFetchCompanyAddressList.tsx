import {useQuery} from "@tanstack/react-query";
import {getAllWithoutAuth} from "../../queries/QueryService";
import {Address} from "../../../model/Address";

export default function useFetchCompanyAddressList(id: string) {
	return useQuery({
		queryKey: ["address-list-company", id],
		// TODO put real type and create type
		queryFn: async (): Promise<Address[]> => {
			return await getAllWithoutAuth("http://localhost:8090/api/v1/company/address-list/" + id);
		}
	})

}