import { useCallback, useEffect, useState } from 'react';
import './css/AdminPage.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios";

function AdminPage() {

	const [activeItem, setActiveItem] = useState(0);
	const [showPurchaseHistorySearch, setShowPurchaseHistorySearch] = useState(false);
	const [purchaseHistorySearch, setPurchaseHistorySearch] = useState("");

	const jsonValue = require('../../information.json');

	const handleActiveItemChange = (index) => {
		setActiveItem(index);
	}

	const handlePurchaseHistorySearchClick = () => {
		setShowPurchaseHistorySearch(!showPurchaseHistorySearch);
		setPurchaseHistorySearch("");
	}

	const handlePurchaseHistorySearchChange = (e) => {
		setPurchaseHistorySearch(e.target.value);
	}

	const purchaseHistory = [
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Success"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Pending"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Rejected"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Success"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Pending"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Rejected"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Success"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Pending"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Rejected"
		},
		{
			"orderID": "#15267",
			"dateFrom": "Mar 1, 2023",
			"dateTo": "Mar 10, 2023",
			"carID": "#1",
			"locationID": "#2",
			"price": "600,-",
			"status": "Success"
		}
	]

	return (
		<div className="adminpage">
			<div className='adminSelectContainer'>
				<h1>Control panel.</h1>
				<div className='adminSelect'>
					<div className='adminSelectItem' style={activeItem === 0 ? { "backgroundColor": "rgba(44, 129, 200, 0.55)" } : { "": "" }} onClick={() => handleActiveItemChange(0)}>Cars</div>
					<div className='adminSelectItem' style={activeItem === 1 ? { "backgroundColor": "rgba(44, 129, 200, 0.55)" } : { "": "" }} onClick={() => handleActiveItemChange(1)}>Locations</div>
					<div className='adminSelectItem' style={activeItem === 2 ? { "backgroundColor": "rgba(44, 129, 200, 0.55)" } : { "": "" }} onClick={() => handleActiveItemChange(2)}>Users</div>
				</div>
			</div>
			<div className='adminContent'>
				{activeItem === 0 ? <h2>Change, add, hide and remove cars</h2> : ""}
				{activeItem === 1 ? <h2>Change, add, hide and remove locations</h2> : ""}
				{activeItem === 2 ? <h2>Administrate users</h2> : ""}
				<div className='adminContentItemContainer'>
					<div className='adminContentItem'>

					</div>
				</div>
			</div>
			<div className='adminStatsHolder'>
				<div className='adminStatsContainer'>
					<h2>Revenue</h2>
					<div className='adminRevenueContainer'>
						<LineChart
							xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }]}
							series={[
								{
									data: [0, 2, 5, 7, 9, 10, 12, 15, 18, 20, 22, 2],
									curve: "linear",
									color: '#5388D8',
								},
							]}
						/>
					</div>
				</div>
				<div className='adminStatsContainer'>
					<h2>Top 5 Car Rental</h2>
					<div className='adminTop5Container'>
						<div className='adminCakeDiagram'>
							<PieChart
								width={220}
								margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
								series={[
									{
										data: [
											{ value: 510, color: '#0D3559' },
											{ value: 439, color: '#175D9C' },
											{ value: 406, color: '#2185DE' },
											{ value: 197, color: '#63A9E8' },
											{ value: 78, color: '#A6CEF2' },
										],
										innerRadius: 80,
										outerRadius: 100,
										cornerRadius: 5,
										paddingAngle: 1
									},
								]}
							/>
							<div className='adminCakeDiagramText'>
								<h2>1630</h2>
								<p>Rental Car</p>
							</div>
						</div>
						<div className='adminTop5List'>
							<div className='adminTop5Item'>
								<div className='adminTop5ItemLeft'>
									<div className='adminTop5ItemColor' style={{ "backgroundColor": "#0D3559" }} />
									<div className='adminTop5ItemAmount'>Car 1</div>
								</div>
								<div className='adminTop5ItemRight'>
									<p>510</p>
								</div>
							</div>
							<div className='adminTop5Item'>
								<div className='adminTop5ItemLeft'>
									<div className='adminTop5ItemColor' style={{ "backgroundColor": "#175D9C" }} />
									<div className='adminTop5ItemAmount'>Car 2</div>
								</div>
								<div className='adminTop5ItemRight'>
									<p>439</p>
								</div>
							</div>
							<div className='adminTop5Item'>
								<div className='adminTop5ItemLeft'>
									<div className='adminTop5ItemColor' style={{ "backgroundColor": "#2185DE" }} />
									<div className='adminTop5ItemAmount'>Car 3</div>
								</div>
								<div className='adminTop5ItemRight'>
									<p>406</p>
								</div>
							</div>
							<div className='adminTop5Item'>
								<div className='adminTop5ItemLeft'>
									<div className='adminTop5ItemColor' style={{ "backgroundColor": "#63A9E8" }} />
									<div className='adminTop5ItemAmount'>Car 4</div>
								</div>
								<div className='adminTop5ItemRight'>
									<p>197</p>
								</div>
							</div>
							<div className='adminTop5Item'>
								<div className='adminTop5ItemLeft'>
									<div className='adminTop5ItemColor' style={{ "backgroundColor": "#A6CEF2" }} />
									<div className='adminTop5ItemAmount'>Car 5</div>
								</div>
								<div className='adminTop5ItemRight'>
									<p>78</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='adminPurchaseHistoryContainer'>
				<div className='adminPurchaseHistorySearchButtonContainer'>
					<div className='adminPurchaseHistorySearchButton' onClick={handlePurchaseHistorySearchClick}>
						<svg fill="#ffffff" height="45px" width="45px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 490.4 490.4">
							<g>
								<path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
			s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
			M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/>
							</g>
						</svg>
					</div>
					<input value={purchaseHistorySearch} onChange={handlePurchaseHistorySearchChange} style={showPurchaseHistorySearch ? { "display": "block" } : { "display": "none" }} type='text' placeholder='Search...' />
				</div>
				<ul className='adminTopPurchaseUl'>
					<li>Order ID</li>
					<li>Date From</li>
					<li>Date To</li>
					<li>Car ID</li>
					<li>Location ID</li>
					<li>Price</li>
					<li>Status</li>
				</ul>
				{purchaseHistory.map((p, i) => {
					return (
						<ul className='adminTopPurchaseList'>
							<li>{p.orderID}</li>
							<li>{p.dateFrom}</li>
							<li>{p.dateTo}</li>
							<li>{p.carID}</li>
							<li>{p.locationID}</li>
							<li>{p.price}</li>
							<li style={{ "color": statusColor(p.status) }}>{p.status}</li>
						</ul>
					)
				})}
				<div className='adminPurchaseHistoryBottom'>
					<div className='adminPurchaseHistoryPerPage'>
						<select>
							<option>10</option>
							<option>15</option>
							<option>20</option>
							<option>25</option>
							<option>30</option>
							<option>35</option>
							<option>40</option>
							<option>45</option>
							<option>50</option>
						</select>
						<p>Per page</p>
					</div>

					<div className='adminPurchaseHistoryPage'>
						<select>
							<option>1</option>
						</select>
						<p>of 1 pages</p>
						<div className='adminPurchaseHistoryPageArrow'>
							<div>
								<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M5.25793 0.395008C5.48157 0.5867 5.50747 0.923393 5.31578 1.14703L1.34661 5.77772L5.31578 10.4084C5.50747 10.6321 5.48157 10.9687 5.25793 11.1604C5.03429 11.3521 4.69759 11.3262 4.5059 11.1026L0.239236 6.12481C0.068041 5.92508 0.068041 5.63036 0.239236 5.43063L4.5059 0.452856C4.69759 0.229215 5.03429 0.203316 5.25793 0.395008Z" fill="#333333" fill-opacity="0.8" />
								</svg>
							</div>
							<div>
								<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M0.186254 0.395008C0.409895 0.203316 0.746588 0.229215 0.93828 0.452856L5.20495 5.43063C5.37614 5.63036 5.37614 5.92508 5.20495 6.12481L0.93828 11.1026C0.746588 11.3262 0.409895 11.3521 0.186254 11.1604C-0.0373862 10.9687 -0.0632856 10.6321 0.128406 10.4084L4.09757 5.77772L0.128406 1.14703C-0.0632856 0.923393 -0.0373862 0.5867 0.186254 0.395008Z" fill="#333333" fill-opacity="0.8" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

function statusColor(status) {
	if (status === "Success") {
		return "#0EAD69";
	} else if (status === "Pending") {
		return "#0978F2";
	} else if (status === "Rejected") {
		return "rgba(193, 11, 14, 0.8)";
	}
}

export default AdminPage;