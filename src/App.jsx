import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXBAY_API}&q=${searchTerm}&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  return (
    <div className="container mx-auto">
      <ImageSearch setText={(text) => setSearchTerm(text)} />
      {!isLoading && !images.length && (
        <h1 className="text-6xl text-center mx-auto">No Results Found</h1>
      )}
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
