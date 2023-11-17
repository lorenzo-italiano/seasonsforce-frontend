
export interface CreateOffer {
	"job_title": string
	"job_description": string
	"contract_type": string
	"companyId": string
	"hours_per_week": number
	"salary": number
	"addressId": string
	"benefits": Array<string>
	"offer_language": string
	"publication_date": string
	"offer_status": string
	"contact_information": string
	"required_degree": string
	"required_experience": string
	"required_skills": Array<string>
	"jobCategoryId": string
	"creatorId": string
	"recruitedId": string
	"startDate": string
	"endDate": string
}
