import React, { useState } from "react";
import "./typeahead.css";

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
