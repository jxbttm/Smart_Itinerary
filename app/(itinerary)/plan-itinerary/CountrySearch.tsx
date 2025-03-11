"use client"; // This makes this file run on the client side

import { useState, useEffect } from "react";
import { Country } from "@/types/Country";

interface CountrySearchProps {
  countries: Country[];
  onSearchTermChange: (term: string) => void;
}

export default function CountrySearch({
  countries,
  onSearchTermChange,
}: CountrySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countries);
  const [dropdownOpen, setDropdownOpen] = useState(false); //Control dropdown state & override daisy UI

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchTermChange(e.target.value);
  };

  const handleCountrySelect = (country: Country) => {
    setSearchTerm(country.country_name);
    setDropdownOpen(false); // Close the dropdown when a country is selected
    onSearchTermChange(country.country_name);
  };

  const filterCountries = () => {
    if (countries) {
      const filtered = countries.filter((country) =>
        country.country_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };
  useEffect(() => {
    filterCountries();
  }, [searchTerm, countries]);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-bold">
          Where do you want to Explore?
        </span>
      </label>
      <input
        type="text"
        placeholder="Select a Country"
        name="country"
        className="input input-bordered w-full bg-base-100 text-black"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setDropdownOpen(true)} // Open dropdown when input is focused
        required
      />
      {/* Dropdown list */}
      {dropdownOpen && (
        <ul className="dropdown-content dropdown-open menu shadow bg-base-100 max-w-lg max-h-64 overflow-y-auto z-10 absolute left-8 mt-20">
          {filteredCountries && filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <li
                key={country.country_code}
                onClick={() => handleCountrySelect(country)}
              >
                <span className="text-black">{country.country_name}</span>
              </li>
            ))
          ) : (
            <li>
              <span>No countries found</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
function onSearchTermChange(value: string) {
  throw new Error("Function not implemented.");
}
