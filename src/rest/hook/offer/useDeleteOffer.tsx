import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteById, post} from "../../queries/QueryService";
import {useState} from "react";
import {Offer} from "../../../model/create/Offer";

export default function useDeleteOffer(getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	const [companyId, setCompanyId] = useState<string>(null)

	return useMutation<String, Error, Object>({
		mutationFn: async (offer) => {
			setCompanyId(offer.company.id)
			return await deleteById("http://localhost:8090/api/v1/offer/" + offer.id, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["offer-list"]})
			await queryClient.invalidateQueries({ queryKey: ["company-offer-list", companyId]})
			return data
		}
	})
}