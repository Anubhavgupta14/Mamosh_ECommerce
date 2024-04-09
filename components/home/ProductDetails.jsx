import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FaqAccordion from './FaqAccordion';

function ProductDetails() {
	const [key, setKey] = useState('home');

	return (
		<Tabs
			id="controlled-tab-example"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="mb-3"
		>
			<Tab eventKey="home" title="INFO">
				<p className="text-muted">
					Meet Series 2 Flip. Made for on-the-move.
					Features a stainless steel telescopic straw, sports flip-lid, easy carry loop plus antimicrobial drinking surfaces. Available in 2 sizes and 5 colours.
					24 hours cold. <br/> <br />

					Flip bottles are compatible with the Series 2 Bottle Loops when used with a Series 2 Bottle collar.
						<br /><br />
					*Flip bottles and lids are excluded from all promotions.

				</p>
			</Tab>
			<Tab eventKey="profile" title="FAQS">
				<FaqAccordion/>
			</Tab>
			<Tab eventKey="delivery" title="DELIVERY">
				<div>
					<h4>STANDARD DELIVERY</h4>
					<ul>
						<li>
							<p className="text-muted">
								Evri: 2 to 4 days from the despatch confirmation email
							</p>
						</li>
						<li>
							<p className="text-muted">
								Free for orders over £20
							</p>
						</li>
						<li>
							<p className="text-muted">
								£3 for orders under £20
							</p>
						</li>
						
					</ul>
					<h4>EXPRESS DELIVERY</h4>
					<ul>
						<li>
							<p className="text-muted">
								DPD: 1 to 2 days from the despatch confirmation email
							</p>
						</li>
						<li>
							<p className="text-muted">
								Free for orders over £60
							</p>
						</li>
						<li>
							<p className="text-muted">
								£5 for orders under £60
							</p>
						</li>
					</ul>
					<p>Express delivery is not available for Jersey & Guernsey</p>
					<button className='btn-primary w-50'>
						READ MORE
					</button>
				</div>
			</Tab>
			<Tab eventKey="returns" title="RETURNS">
				<h4>RETURN UP TO 30 DAYS AFTER DELIVERY</h4>
				pIf you are returning items from the UK please use our portal below. Please note that a printer is required.
				<div className="d-flex w-75 g-1	mt-3">
					<button className="btn-primary">READ MORE</button>
					<button className="btn-primary">START RETURN</button>
				</div>
			</Tab>
		</Tabs>
	);
}

export default ProductDetails;