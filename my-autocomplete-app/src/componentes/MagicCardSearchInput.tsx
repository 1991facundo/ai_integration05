"use client";

import React, { useState, useEffect } from 'react';

const MagicCardSearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://127.0.0.1:8000/autocomplete/?query=${inputValue}`);
        if (!response.ok) {
          throw new Error('Error fetching suggestions');
        }
        const data = await response.json();
        console.log('Suggestions received:', data.suggestions);
        setSuggestions(data.suggestions);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSuggestions([]); 
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type to search..."
        className="w-full p-2 border rounded text-black bg-white"
        style={{ color: 'black' }}
      />
      {isLoading && <p className="mt-2" style={{ color: 'black' }}>Loading...</p>}
      {error && <p className="mt-2" style={{ color: 'black' }}>{error}</p>}
      <ul className="mt-2 border rounded bg-white text-black">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="p-2 hover:bg-gray-200" style={{ color: 'black' }}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MagicCardSearchInput;
