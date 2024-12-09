import Database from 'better-sqlite3';

const db = new Database("addresses.db");

const getSuggestions = (searchString, limit = 10) => {
    // Match any address containing our search string
    const sqlSearchString = `%${searchString}%`;
    
    // The db is already NOCASE by default but we explictly ask for a case insensitive match
    const selectAll = db.prepare(`
        SELECT FullAddress
        FROM addressesAutocomplete
        WHERE FullAddress LIKE @sqlSearchString COLLATE NOCASE
        LIMIT @limit
        `);
        
    return selectAll.all({sqlSearchString, limit}).map(s => s.FullAddress.trim());
}

const getLatLong = (fullAddress) => {
    const select = db.prepare(`
        SELECT LAT, LON
        FROM addressesAutocomplete
        WHERE FullAddress = @fullAddress
        `);
    
    const { LAT: lat, LON: long } = select.get({fullAddress})
    return {lat, long}
}

export { getSuggestions, getLatLong }