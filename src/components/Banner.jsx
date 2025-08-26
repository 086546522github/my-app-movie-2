import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import ImgMovie from "../assets/temp-1.png";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
  return (
    <div className="md:h-[700px] h-[1100px] w-full bg-banner bg-cover bg-center bg-no-repeat relative mt-[75px]">
      <div className="w-full h-full bg-black/40 " />
      <div className="flex flex-col md:flex-row items-center justify-between absolute md:top-1/2 top-10 -translate-x-1/2 left-1/2 md:-translate-y-1/2 w-full ">
        <div className="md:w-[50%] w-full ">
          <div className="flex flex-col space-y-6 items-start p-10">
            <p className="bg-gradient-to-r from-red-600 to-red-300 py-2 px-6">
              TV Show
            </p>
            <div className="flex flex-col space-y-4">
              <h1 className="text-[40px] font-bold text-white ">
                Mưa Đỏ
              </h1>
              <div className="flex items-center space-x-3">
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRatingHalf} alt="rating" className="w-8 h-8" />
              </div>
              <p className="text-white">
                Mưa đỏ là tiểu thuyết chiến tranh của Việt Nam do Chu Lai sáng tác và được Nhà xuất bản Quân đội Nhân dân phát hành năm 2016, 
                lấy bối cảnh là trận chiến kéo dài 81 ngày ở Thành cổ Quảng Trị mùa hè năm 1972. 
                Mưa đỏ là tiểu thuyết thứ 14 của Chu Lai và là tác phẩm đầu tiên ông viết về Trận Thành cổ Quảng Trị.
                Nội dung đề cập đến các nhân của cả hai phía chiến trường, với các nhân vật chính là Cường một người lính Giải Phóng và Quang chỉ huy lực lượng Hắc Báo.
              </p>
            </div>

            <div className="flex items-center space-x-5">
              <button className="py-2 px-3 bg-black  text-white border border-black font-bold">
                Chi tiết
              </button>
              <button className="py-2 px-3 bg-red-600 text-white font-bold">
                Xem Phim
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group">
            <button className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <img src={IconPlay} alt="play" className="w-16 h-16" />
            </button>
            <img
              src={ImgMovie}
              alt="banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
