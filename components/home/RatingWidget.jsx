import React from 'react'


const RatingWidget = () => {
	return (
		<div>
			<img src="/trustpilot.svg" alt="" />
			<img src="/stars.svg" alt="" />
			<div id="reviews-summary" class="tp-widget-businessinfo">
				<div aria-hidden="true" class="tp-widget-businessinfo__trustscore">
					<span>TrustScore</span> <strong id="trust-score">4.2</strong>
				</div>
				<div class="tp-widget-businessinfo__total">
					<strong id="businessEntity-numberOfReviews-total">108,288</strong>
					<span id="translations-reviews">reviews</span>
				</div>
			</div>
		</div>
	)
}

export default RatingWidget