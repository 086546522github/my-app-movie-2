import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data để test khi không có API key
  const mockMovies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      poster_path: "/temp-1.jpeg",
      vote_average: 8.4
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      poster_path: "/temp-1.jpeg",
      vote_average: 8.2
    },
    {
      id: 3,
      title: "Black Panther",
      poster_path: "/temp-1.jpeg",
      vote_average: 7.9
    }
  ];

  const handleSearch = async (value) => {
    if (!value.trim()) {
      setSearchData([]);
      return;
    }

    // Nếu không có API key, sử dụng mock data
    if (!import.meta.env.VITE_API_KEY) {
      const filtered = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchData(filtered);
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&include_adult=false&language=vi&page=1`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchData(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchData([]);
      setError("Lỗi tìm kiếm. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      // Nếu không có API key, sử dụng mock data
      if (!import.meta.env.VITE_API_KEY) {
        setTrendingMovies(mockMovies);
        setTopRatedMovies(mockMovies);
        setIsLoading(false);
        return;
      }

      try {
        const urls = [
          "https://api.themoviedb.org/3/trending/movie/day?language=vi",
          "https://api.themoviedb.org/3/movie/top_rated?language=vi",
        ];

        const responses = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url, {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
          })
        );

        setTrendingMovies(responses[0].results || []);
        setTopRatedMovies(responses[1].results || []);
      } catch (error) {
        console.error("Fetch movies error:", error);
        setError("Không thể tải dữ liệu phim. Vui lòng kiểm tra kết nối mạng.");
        // Fallback to mock data
        setTrendingMovies(mockMovies);
        setTopRatedMovies(mockMovies);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <MovieProvider>
      <div className="h-full bg-black text-white min-h-screen pb-10 relative">
        <Header onSearch={handleSearch} />
        
        {error && (
          <div className="bg-red-600 text-white p-4 text-center mt-16">
            {error}
          </div>
        )}
        
        <Banner />
        
        {searchData.length === 0 && !isLoading && (
          <>
            <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
            <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          </>
        )}

        {searchData.length > 0 && <MovieSearch data={searchData} />}
      </div>
    </MovieProvider>
  );
}

export default App;
