import {Offer} from "./Offer";

export interface OfferDetailRouteParams {
	initialValues: Offer | undefined
	isUpdate: boolean
}