import PropTypes from "prop-types";
import { useContext } from "react";
import { MovieContext } from "../context/MovieDetailContext";

const MovieSearch = ({ data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  if (!data || data.length === 0) {
    return (
      <div className="my-10 px-10">
        <h2 className="text-xl uppercase mb-4">Kết quả tìm kiếm</h2>
        <p className="text-gray-400">Không tìm thấy kết quả nào</p>
      </div>
    );
  }

  const getImageUrl = (posterPath) => {
    if (!posterPath) return "/temp-1.jpeg";
    
    if (import.meta.env.VITE_IMG_URL && posterPath.startsWith('/')) {
      return `${import.meta.env.VITE_IMG_URL}${posterPath}`;
    }
    
    return "/temp-1.jpeg";
  };

  return (
    <div className="my-10 px-10 max-w-full">
      <h2 className="text-xl uppercase mb-4">Kết quả tìm kiếm ({data.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-cover bg-no-repeat bg-center w-full h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${getImageUrl(item.poster_path)})`,
            }}
            onClick={() => handleVideoTrailer(item.id)}
          >
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md uppercase text-center">
                {item.name || item.title || item.original_title || "Không có tên"}
              </h3>
              {item.vote_average && (
                <p className="text-sm text-yellow-400 mt-1">
                  ⭐ {item.vote_average.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MovieSearch.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MovieSearch;
