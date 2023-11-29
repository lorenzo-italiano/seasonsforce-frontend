import React from 'react';
import {Text, View} from "react-native";
import {formatIsoToSimpleDate} from "../../utils/DateHelper";
import ReviewCard from "../card/ReviewCard";

const ReviewList = ({reviewList}) => {


	return (
		<>
			{ reviewList?.map((review) => {
				return(
					<ReviewCard key={review.id} review={review} />
				)})
			}
		</>
	)
}

export default ReviewList;