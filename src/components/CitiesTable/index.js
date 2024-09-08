import TableRow from "../TableRow";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from 'react-loader-spinner'
import { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

const CitiesTable = () => {
    const [tableData, setTableData] = useState([])
    const [limit, setLimit] = useState(20)
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const fetchTableData = async () => {
            const response = await axios(
                `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`
            );
            const updatedData = response.data.results.map(each => ({
                geonameId: each.geoname_id,
                name: each.name,
                countryName: each.cou_name_en,
                population: each.population,
                timeZone: each.timezone,
                countryCode: each.country_code,
                lat: each.coordinates.lat,
                lon: each.coordinates.lon,
            }))
            setTableData(updatedData)
        };
        fetchTableData();
    }, [])

    const fetchMore = () => {
        setLimit(limit + 20)
        const fetchTableData = async () => {
            const response = await axios(
                `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`
            );
            const updatedData = response.data.results.map(each => ({
                geonameId: each.geoname_id,
                name: each.name,
                countryName: each.cou_name_en,
                population: each.population,
                timeZone: each.timezone,
                countryCode: each.country_code,
                lat: each.coordinates.lat,
                lon: each.coordinates.lon,
            }))
            setTableData(tableData.concat(updatedData))
        };
        fetchTableData();
    }

    const onChangeSearchInput = event => {
        setSearchInput(event.target.value)
    }
    
    const searchResult = tableData.filter(eachName =>
        eachName.name.includes(searchInput)
    )

    return (
        <div className="main-container">
                <div className="heading-card">
                    <h1 className="heading">Weather Forecast Table</h1>
                    <div className="search-card">
                        <label className="search-label" htmlFor="search">Search</label>
                        <input
                            type="search" 
                            value={searchInput}
                            id="search"
                            placeholder="Search city"
                            className="search-input"
                            onChange={onChangeSearchInput} />
                    </div>
                </div>

                <ul className="list-container">
                    <div className="table-header-card">
                        <li className="index-item"></li>
                        <li className="header-column">Geoname ID</li>
                        <li className="header-column">Name</li>
                        <li className="header-column">Country Name</li>
                        <li className="header-column">Population</li>
                        <li className="header-column">Timezone</li>
                        <li className="header-column">Country Code</li>
                        <li className="header-column">Coordinates</li>
                    </div>
                    <InfiniteScroll
                        dataLength={tableData.length}
                        next={fetchMore}
                        hasMore={true}
                        height={450}
                        loader={<Loader type="TailSpin" color="#00BFF" height={50} width={50} />}
                    >
                        {searchResult.map((eachColumn, index) => (
                            <TableRow columnData={eachColumn} key={eachColumn.geonameId} index={index} />
                        ))}
                    </InfiniteScroll>
                </ul>
            </div>
    )
}

export default CitiesTable