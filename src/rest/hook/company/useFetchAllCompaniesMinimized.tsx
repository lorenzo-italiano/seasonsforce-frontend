import {useQuery} from "@tanstack/react-query";
import {getAll, getAllWithoutAuth} from "../../queries/QueryService";
import {CompanyMinimized} from "../../../model/CompanyMinimized";

export default function useFetchAllCompaniesMinimized(getValidToken: () => Promise<string>) {
	return useQuery({
		queryKey: ["company-list-minimized"],
		// TODO put real type and create type
		queryFn: async (): Promise<CompanyMinimized[]> => {
			return await getAll("http://localhost:8090/api/v1/company/minimized", getValidToken);
		}
	})

}