import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patch} from "../../queries/QueryService";
import {useState} from "react";

export default function useRemoveRecruitedIdToOffer(getValidToken: () => Promise<string>, offerCompanyId: string) {
	const queryClient = useQueryClient();

	const [companyId, setCompanyId] = useState<string>(null)
	const [offerId, setOfferId] = useState<string>(null)

	return useMutation({
		mutationFn: async (offerId: string) => {
			setCompanyId(offerCompanyId)
			setOfferId(offerId)
			return await patch("http://localhost:8090/api/v1/offer/" + offerId + "/recruited/remove/", {}, getValidToken);
		},
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({ queryKey: ["offer-list"]})
			await queryClient.invalidateQueries({ queryKey: ["offer", offerId]})
			await queryClient.invalidateQueries({ queryKey: ["company-offer-list", companyId]})
			return data
		},
		onError: async (error) => {
			// console.error(error)
			setCompanyId(null)
			setOfferId(null)
		}
	})
}