import {useQuery} from "@tanstack/react-query";
import {getAll} from "../../queries/QueryService";

export default function useFetchOfferById(getValidToken: () => Promise<string>, offerId: string) {
	return useQuery({
		queryKey: ["offer", offerId],
		// TODO put real type and create type
		queryFn: async (): Promise<Object[]> => {
			return await getAll("http://localhost:8090/api/v1/offer/detailed/" + offerId, getValidToken);
		}
	})
}