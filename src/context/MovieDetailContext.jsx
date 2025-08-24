import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

// Setup Modal
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const MovieContext = createContext();

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
    modestbranding: 1,
    rel: 0,
  },
};

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVideoTrailer = async (movieId) => {
    setIsLoading(true);
    setError(null);

    // Nếu không có API key, hiển thị thông báo
    if (!import.meta.env.VITE_API_KEY) {
      setError("API key không được cấu hình. Không thể xem trailer.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setTrailerUrl(data.results[0].key);
        setIsOpen(true);
      } else {
        setError("Không tìm thấy trailer cho phim này!");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setError("Có lỗi khi tải trailer. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTrailerUrl("");
    setError(null);
  };

  return (
    <MovieContext.Provider value={{ handleVideoTrailer, isLoading }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: 'none',
            background: 'transparent',
            padding: 0,
          },
        }}
        contentLabel="Movie Trailer"
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute -top-10 right-0 text-white text-2xl hover:text-red-500 z-10"
          >
            ✕
          </button>
          
          {error && (
            <div className="bg-red-600 text-white p-4 rounded text-center">
              {error}
            </div>
          )}
          
          {isLoading && (
            <div className="bg-black text-white p-8 rounded text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
              Đang tải trailer...
            </div>
          )}
          
          {trailerUrl && !isLoading && (
            <div className="flex items-center justify-center">
              <YouTube videoId={trailerUrl} opts={opts} />
            </div>
          )}
        </div>
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };
