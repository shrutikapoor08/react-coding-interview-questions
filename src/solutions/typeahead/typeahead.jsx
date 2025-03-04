import React, { useState } from "react";
import _ from "lodash";
import "./typeahead.css";
const productList = [
  "Apple",
  "Banana",
  "Blueberry",
  "Blackberry",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Dragon Fruit",
  "Durian",
  "Elderberry",
  "Fig",
  "Grape",
  "Grapefruit",
  "Guava",
  "Lime",
  "Honeydew",
  "Jackfruit",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Watermelon",
];
const Typeahead = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const debouncedSearchProductList = React.useCallback(
    _.debounce((value) => {
      if (!value) return;
      const filteredSuggestions = productList.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }, 500),
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(event.target.value);

    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    //debounce search
    debouncedSearchProductList(value);
  };

  const handleSelectedSuggestion = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    console.log("handle focus");
    setSelectedIndex(0);
    setShowSuggestions(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setShowSuggestions(false);
      handleSelectedSuggestion(suggestions[selectedIndex]);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setShowSuggestions(false);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
      setShowSuggestions(true);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
      setShowSuggestions(true);
    }
  };

  return (
    <div className="typeahead">
      <input
        className="typeahead-input"
        type="text"
        name="typeahead"
        placeholder="Search"
        value={input}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        aria-label="Search Products"
      />
      {showSuggestions && (
        <div className="typeahead-dropdown">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                className={index === selectedIndex ? "selected" : ""}
                onClick={() => handleSelectedSuggestion(suggestion)}
                key={index}
                aria-selected={index === selectedIndex}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Typeahead;
