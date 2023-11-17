import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";

export default function useFetchCompanyOfferList(id: string, getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["company-offer-list", id],
		// TODO put real type and create type
		queryFn: async (): Promise<Object[]> => {
			return await getAll("http://localhost:8090/api/v1/offer/company/" + id, getValidToken);
		},
		enabled: !!id
	})

}