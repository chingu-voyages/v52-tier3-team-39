import { getSuggestions } from "../addresses/address.js";

export function getAddressAutocompleteSuggestions(req, res, _) {
  const { searchString, limit } = req.query;

  if (!searchString) {
    res.status(400);
    return res.json({error: "searchString not set"});
  }
  
  const suggestions = getSuggestions(searchString, limit);
  
  res.status(200);
  return res.json({suggestions}); 
}