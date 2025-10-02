import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import "./typeahead.css";

/*
. Create a search input field that displays autocomplete suggestions as the user types - 10
2. Fetch suggestion data from the provided API endpoint - 5
3. Allow users to select suggestions via mouse click or keyboard navigation - 10
4. Handle the submission of the selected item or custom search text - 2

Nice to have - 
1. Debounce

*/

const API_URL = "https://dummyjson.com/products";

const Typeahead = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProductsList(data.products);
      });
  }, [API_URL]);

  const debouncedSearchProductList = useCallback(
    _.debounce((value) => {
      const filteredSuggestions = productsList.filter((suggestion) =>
        suggestion?.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }, 500),
    [productsList]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debouncedSearchProductList(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSuggestionClick(e.target.innerText);
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      //TRY IT OUT
    }
  };

  return (
    <>
      <div className="typeahead-container">
        <input
          type="text"
          className="typeahead-input"
          placeholder="Search"
          name="typeahead-input"
          value={inputValue}
          onChange={handleChange}
        />
        <div className="typeahead-dropdown">
          {showSuggestions && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  onClick={() => handleSuggestionClick(suggestion?.title)}
                  onKeyDown={handleKeydown}
                  key={suggestion?.id}
                  className="typeahead-suggestion"
                >
                  {suggestion?.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <h2> {inputValue} </h2>
    </>
  );
};

export default Typeahead;
