const Country = ({ countries, setToShow }) => {

    const handleClick = (name) => {
        setToShow([countries.find(country => country.name.common === name)])
    }

    if (countries.length > 10) {
        return (
            <div>
                Too many matches
            </div>
        )
    }

    if (countries.length === 0) {
        return (
            <div>
                No matches
            </div>
        )
    }
    
    if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h1>
                    {country.name.common}
                </h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} km2</p>
                <h2>
                    Languages:
                </h2>
                <ul>
                    {Object.values(country.languages).map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
                <img src={country.flags.png}></img>
            </div>
        )
    }

    return (
        <div>
            {countries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleClick(country.name.common)}>show</button>
                </div>)}
        </div>
            
    )
}

export default Country