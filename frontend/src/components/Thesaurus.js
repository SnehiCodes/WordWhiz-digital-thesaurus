import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaGithub } from "react-icons/fa";

const Thesaurus = () => {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchThesaurusData = async () => {
    if (!word) {
      setError("Please enter a word.");
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/word/${word}`);
      setData(response.data);
      setError("");
    } catch (err) {
      setData(null);
      setError("Word not found. Please try another word.");
    }
  };

  return (
    <div
      className="container text-center min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        //background: "linear-gradient(135deg, #1e3c72, #2a5298, #a8c0ff)",
        color: "white",
        padding: "2rem",
        transition: "background 0.5s ease",
      }}
    >
      {/* GitHub Icon (Clickable) */}
      <a
        href="https://github.com/SnehiCodes/WordWhiz-digital-thesaurus"
        target="_blank"
        rel="noopener noreferrer"
        className="position-absolute top-0 end-0 p-3"
      >
        <FaGithub size={30} color="white" />
      </a>

      <h1 className="mb-4" style={{ fontSize: "2.5rem" }}>
        <span role="img" aria-label="magnifying glass">🔎</span> Thesaurus Explorer
      </h1>

      {/* Styled Input Box */}
      <div className="input-group mb-3 w-50">
        <input
          type="text"
          className="form-control"
          style={{
            border: "2px solid black", // Black Border
            borderRadius: "5px",
            padding: "10px",
          }}
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button className="btn btn-dark" onClick={fetchThesaurusData}>
          <FaSearch />
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {/* Answer Box */}
      {data && (
        <div className="answer-container">

          <h3 className="mb-3 text-primary">{data.word}</h3>
          <p><strong><span role="img" aria-label="book">📖</span> Meaning:</strong> {data.meaning}</p>
          <p><strong><span role="img" aria-label="check mark">✅</span> Synonyms:</strong> {data.synonyms.length > 0 ? data.synonyms.join(", ") : "None"}</p>
          <p><strong><span role="img" aria-label="cross mark">❌</span> Antonyms:</strong> {data.antonyms.length > 0 ? data.antonyms.join(", ") : "None"}</p>
        </div>
      )}
    </div>
  );
};

export default Thesaurus;
