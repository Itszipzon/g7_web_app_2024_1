import { useCallback, useEffect, useState } from 'react';
import './css/AdminPage.css';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";

function AdminPage() {

	const [activeItem, setActiveItem] = useState(0);

	const jsonValue = require('../../information.json');

	const handleActiveItemChange = (index) => {
		setActiveItem(index);
	}

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
										innerRadius: 75,
										outerRadius: 100,
										cornerRadius: 8,
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
		</div>
	);

}

export default AdminPage;