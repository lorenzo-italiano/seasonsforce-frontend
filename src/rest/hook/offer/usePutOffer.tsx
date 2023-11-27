import {useMutation, useQueryClient} from "@tanstack/react-query";
import {put} from "../../queries/QueryService";
import {CreateOffer} from "../../../model/create/CreateOffer";
import {useState} from "react";

export default function usePutOffer(getValidToken: () => Promise<string>) {
	const queryClient = useQueryClient();

	const [companyId, setCompanyId] = useState<string>(null)
	const [offerId, setOfferId] = useState<string>(null)

	return useMutation<String, Error, Object>({
		mutationFn: async (offer: CreateOffer) => {
			setCompanyId(offer.companyId)
			setOfferId(offer.id)
			return await put("http://localhost:8090/api/v1/offer/", offer, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["offer-list"]})
			await queryClient.invalidateQueries({ queryKey: ["offer", offerId]})
			await queryClient.invalidateQueries({ queryKey: ["company-offer-list", companyId]})
			return data
		}
	})
}