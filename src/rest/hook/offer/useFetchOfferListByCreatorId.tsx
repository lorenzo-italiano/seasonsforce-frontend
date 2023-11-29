import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";

export default function useFetchOfferListByCreatorId(creatorId: string, getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["company-offer-list-creator", creatorId],
		// TODO put real type and create type
		queryFn: async (): Promise<Object[]> => {
			return await getAll("http://localhost:8090/api/v1/offer/creator/" + creatorId, getValidToken);
		},
		enabled: !!creatorId
	})

}