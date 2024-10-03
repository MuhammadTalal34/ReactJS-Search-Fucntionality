import React, { useState, useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./index.css"; // Ensure Tailwind CSS is working
import Loader from "./component/Loader";

const App = () => {
  // State to store image data
  const [data, setImageData] = useState([]);
  // State to manage the search input words
  const [query, setQuery] = useState("");
  // State to keep track of the current search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to handle pagination
  const [imageCount, setImageCount] = useState(30); // Set the initial count for images
  const [page, setPage] = useState(1);
  // State to show loading status
  const [loading, setLoading] = useState(false);
  // Your Unsplash API key
  const accessKey = "VgT9AKrK2Wdrj6TEnqVPQaU6z8v-BHVStmwRJ0pl-5o"; // Replace with your actual API key

  // Function to fetch images from Unsplash
  const fetchData = async () => {
    const url = searchTerm
      ? `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=${imageCount}&client_id=${accessKey}`
      : `https://api.unsplash.com/photos?page=${page}&per_page=${imageCount}&client_id=${accessKey}`;

    try {
      setLoading(true); // Show loading indicator
      const response = await fetch(url);
      const result = await response.json();
      // Update image data correctly based on search
      setImageData(prevData => 
        searchTerm ? [...prevData, ...result.results] : [...prevData, ...result]
      );
    } catch (error) {
      console.error("Error:", error); // Log any errors

    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Fetch data whenever searchTerm or page changes
  useEffect(() => {
    fetchData(); // Call fetchData whenever the searchTerm or page changes
    
  }, [searchTerm, page]);

  // Function to handle search button click
  const handleSearch = () => {
    setImageData([]); // Clear previous results
    setPage(1); // Reset page number for new search
    setSearchTerm(query); // Set the search term
  };

  // Function to handle Enter key press in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to load more images when the button is clicked
  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1); // Increment the page for the next request
  };
 const removeImages = () =>{
  setLoading(true)
  // Staying On Page 1 
  setPage(page)
  // Emptying The Array Data 
  setImageData([])
  setLoading(false)
 }
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Photos and Illustrations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 border border-gray-300 rounded-l-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Search
          </button>
          <button
                onClick={removeImages}
                className="p-3 ml-2 bg-red-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
              >
                Clear  
              </button>
        </div>
        <PhotoProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((d, index) => (
              <div key={index} className="relative group">
                <PhotoView src={d.urls.regular}>
                  <img
                    src={d.urls.regular}
                    alt={d.alt_description || d.description || d.slug}
                    className="w-full h-72 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  />
                </PhotoView>
              </div>
            ))}
          </div>
          {loading && <div className="text-center"><Loader /></div>}
          {!loading && (
            <div className="text-center mt-6">
              <button
                onClick={loadMoreImages}
                className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
              >
                Load More
              </button>
      
            </div>
            
          )}
        </PhotoProvider>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default App;
