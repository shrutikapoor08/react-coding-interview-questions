import React, { useState } from "react";
import "./typeahead.css";
const sampleData = [
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
  "Kiwi",
  "Lemon",
  "Lime",
  "Mango",
  "Melon",
  "Orange",
  "Papaya",
  "Peach",
  "Pear",
  "Pineapple",
  "Plum",
  "Raspberry",
  "Strawberry",
  "Watermelon",
];
const Typeahead = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        className="typeahead"
        type="text"
        name="typeahead"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Typeahead;
