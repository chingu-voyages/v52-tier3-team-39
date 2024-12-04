import Database from 'better-sqlite3';

const db = new Database("addresses.db");

export function getAddressAutocompleteSuggestions(req, res, _) {
  const { searchString, limit = 10 } = req.query;

  if (!searchString) {
    res.status(400);
    return res.json({error: "searchString not set"});
  }

  // Match any address containing our search string
  const sqlSearchString = `%${searchString}%`;
  
  // The db is already NOCASE by default but we explictly ask for a case insensitive match
  const selectAll = db.prepare(`
      SELECT FullAddress
      FROM addressesAutocomplete
      WHERE FullAddress LIKE @sqlSearchString COLLATE NOCASE
      LIMIT @limit
    `);
  
  const suggestions = selectAll.all({sqlSearchString, limit}).map(s => s.FullAddress.trim());
  
  res.status(200);
  return res.json({suggestions}); 
}