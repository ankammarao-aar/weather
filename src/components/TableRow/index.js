import { Link } from 'react-router-dom'
import './index.css'

const TableRow = props => {
    const {columnData, index} = props
    const {geonameId, name, countryName, population, timeZone, countryCode, lat, lon} = columnData
    return (
        <Link to={`/city/${name}`} target="_blank" className='row-data-container'>
            <li className='index'>{index+1}</li>
            <li className='row-data'>{geonameId}</li>
            <li className='row-data'>{name}</li>
            <li className='row-data'>{countryName}</li>
            <li className='row-data'>{population}</li>
            <li className='row-data'>{timeZone}</li>
            <li className='row-data'>{countryCode}</li>
            <li className='row-data'>{lat + ", " + lon}</li>
        </Link>
    )
}

export default TableRow