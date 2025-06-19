import { useState, useEffect, } from "react";
import "./search.css"

const Tile = ({flagUrl,countryName}) =>{
    return(
        <div
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            margin:"10px",
            padding:"10px",
            border:"solid 1px grey",
            borderRadius:"8px",
            flexDirection:"column",
            width:"200px",
            height:"200px"
        }}>
            <img src={flagUrl} alt={countryName} style={{width:"80px", height:"80px"}} />
            <h2>{countryName}</h2>
        </div>
    )
}


function Search(){
    const [countries,setCountries]=useState([]);
    let [searchString, setSearchString]= useState('')
    const API_ENDPOINT= "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
    useEffect(()=>{
        fetch(API_ENDPOINT)
        .then((response) => response.json())
        .then((data)=> setCountries(data));
    },[]);
    console.log(searchString);
    const filterCountry = countries.filter((country)=> country.common.toLowerCase().includes(searchString.toLowerCase()));
    console.log(filterCountry);
    return(
        <>
        <input type="text" 
        placeholder="Search for Countries..." 
        style={{width:"600px",padding:"10px", margin:"auto"}}
        onChange={(e)=> setSearchString(e.target.value)} />
        <div
        style={{ display:"flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexWrap: "wrap",
        }}
        >
        {filterCountry.map((country)=> <Tile key={country.common} flagUrl={country.png} countryName={country.common}/>)} 
        </div>
        </>
    )
}

export default Search;