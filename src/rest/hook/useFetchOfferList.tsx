import {useQuery} from "@tanstack/react-query";
import {getAll} from "../queries/RecruiterQueries";

export default function useFetchOfferList() {
	return useQuery({
		queryKey: ["offer-list"],
		queryFn: async (): Promise<number> => {
			return await getAll("http://localhost:8090/api/v1/offer/");
		}
	})

}