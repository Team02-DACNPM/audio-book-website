// import { useState } from 'react';
import { useRef } from "react";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Thumbnail from "../../components/Thumbnail/Thumbnail";
import HomeCarousel from "../HomeCarousel/HomeCarousel";
import PlaylistRanking from "../PlaylistRanking/PlaylistRanking";

import { Grid } from "@mui/material";

import {
  RightArrow,
  CarouselPrev,
  CarouselNext,
} from "../../components/Icons/index";
import {
  SCREEN_BREAKPOINTS,
  HEADER_HEIGHT,
  DRAWER_WIDTH,
  TEXT_STYLE,
  FONT_FAMILY,
  COLORS,
} from "../../utils/constants";

// import { fakeData, fakeSuggest, newContent, authors } from '../../mockData/HomeData'
const fakeData = [
  {
    title: "Sách nói chất lượng",
    categories: [
      "Tất cả",
      "Sắp phát hành",
      "Tâm linh",
      "Con cái",
      "Kỹ năng",
      "Doanh nhân",
      "Thành công",
      "Hạnh phúc",
      "Lịch sử",
    ],
    items: [
      { id: 1, avtSrc: "https://picsum.photos/201/201?img=6" },
      { id: 2, avtSrc: "https://picsum.photos/201/201?img=7" },
      { id: 3, avtSrc: "https://picsum.photos/201/201?img=8" },
      { id: 4, avtSrc: "https://picsum.photos/201/201?img=9" },
      { id: 5, avtSrc: "https://picsum.photos/201/201?img=10" },
      { id: 6, avtSrc: "https://picsum.photos/201/201?img=10" },
      { id: 7, avtSrc: "https://picsum.photos/201/201?img=10" },
    ],
  },
  {
    title: "Truyện nói hấp dẫn",
    categories: [
      "Tất cả",
      "Kinh điển Việt Nam",
      "Kinh điển quốc tế",
      "Ngôn tình",
      "Văn học QT hiện đại",
      "Văn học VN hiện đại",
      "Thành công",
      "Trinh thám",
    ],
    items: [
      { id: 1, avtSrc: "https://picsum.photos/201/201?img=11" },
      { id: 2, avtSrc: "https://picsum.photos/201/201?img=12" },
      { id: 3, avtSrc: "https://picsum.photos/201/201?img=13" },
      { id: 4, avtSrc: "https://picsum.photos/201/201?img=14" },
      { id: 5, avtSrc: "https://picsum.photos/201/201?img=15" },
      { id: 6, avtSrc: "https://picsum.photos/201/201?img=10" },
      { id: 7, avtSrc: "https://picsum.photos/201/201?img=10" },
    ],
  },
  {
    title: "Podcast đặc sắc",
    categories: [
      "Tất cả",
      "Tin tức",
      "Văn hóa",
      "Giải trí",
      "Kiến thức",
      "Phân loại",
      "Kinh dị",
      "Ngủ ngon",
      "Thiền-tĩnh tâm",
      "Tâm sự",
    ],
    items: [
      { id: 1, avtSrc: "https://picsum.photos/201/201?img=16" },
      { id: 2, avtSrc: "https://picsum.photos/201/201?img=17" },
      { id: 3, avtSrc: "https://picsum.photos/201/201?img=18" },
      { id: 4, avtSrc: "https://picsum.photos/201/201?img=19" },
      { id: 5, avtSrc: "https://picsum.photos/201/201?img=20" },
      { id: 6, avtSrc: "https://picsum.photos/201/201?img=10" },
      { id: 7, avtSrc: "https://picsum.photos/201/201?img=10" },
    ],
  },
  {
    title: "Sách tóm tắt tinh gọn",
    items: [
      { id: 1, avtSrc: "https://picsum.photos/201/201?img=21" },
      { id: 2, avtSrc: "https://picsum.photos/201/201?img=22" },
      { id: 3, avtSrc: "https://picsum.photos/201/201?img=23" },
      { id: 4, avtSrc: "https://picsum.photos/201/201?img=24" },
      { id: 5, avtSrc: "https://picsum.photos/201/201?img=25" },
      { id: 6, avtSrc: "https://picsum.photos/201/201?img=10" },
      { id: 7, avtSrc: "https://picsum.photos/201/201?img=10" },
    ],
  },
];

const fakeSuggest = [
  { id: 1, avtSrc: "https://picsum.photos/201/201?img=1" },
  { id: 2, avtSrc: "https://picsum.photos/201/201?img=2" },
  { id: 3, avtSrc: "https://picsum.photos/201/201?img=3" },
  { id: 4, avtSrc: "https://picsum.photos/201/201?img=4" },
  { id: 5, avtSrc: "https://picsum.photos/201/201?img=5" },
  { id: 6, avtSrc: "https://picsum.photos/201/201?img=5" },
  { id: 9, avtSrc: "https://picsum.photos/201/201?img=5" },
  { id: 8, avtSrc: "https://picsum.photos/201/201?img=5" },
  { id: 7, avtSrc: "https://picsum.photos/201/201?img=5" },
  { id: 10, avtSrc: "https://picsum.photos/201/201?img=5" },
];

const newContent = [
  { id: 1, avtSrc: "https://picsum.photos/201/201?img=26" },
  { id: 2, avtSrc: "https://picsum.photos/201/201?img=27" },
  { id: 3, avtSrc: "https://picsum.photos/201/201?img=28" },
  { id: 4, avtSrc: "https://picsum.photos/201/201?img=29" },
  { id: 5, avtSrc: "https://picsum.photos/201/201?img=30" },
  { id: 6, avtSrc: "https://picsum.photos/201/201?img=10" },
  { id: 7, avtSrc: "https://picsum.photos/201/201?img=10" },
];

// const authors = [
//   { id: 1, avtSrc: "https://picsum.photos/201/201?img=26" },
//   { id: 2, avtSrc: "https://picsum.photos/201/201?img=27" },
//   { id: 3, avtSrc: "https://picsum.photos/201/201?img=28" },
//   { id: 4, avtSrc: "https://picsum.photos/201/201?img=29" },
//   { id: 5, avtSrc: "https://picsum.photos/201/201?img=30" },
//   { id: 6, avtSrc: "https://picsum.photos/201/201?img=10" },
//   { id: 7, avtSrc: "https://picsum.photos/201/201?img=10" },
// ];

// SwiperCore.use([Navigation]);

const flexCenterStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
};

const SwiperBtnNext = (props) => ({
  position: "absolute",
  right: 0,
  width: "24px",
  height: "24px",
  top: "50%",
  transform: "translate(-40px, 70%)",
  zIndex: 2,
  ...(props.windowSize.width <= SCREEN_BREAKPOINTS.sm && { display: "none" }),
});

const SwiperBtnPrev = (props) => ({
  position: "absolute",
  left: 0,
  width: "24px",
  height: "24px",
  top: "50%",
  transform: "translate(28px, 70%)",
  zIndex: 2,
  ...(props.windowSize.width <= SCREEN_BREAKPOINTS.sm && { display: "none" }),
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ open }) => ({
    flexGrow: 1,

    width: "100%",
    marginLeft: 0,
  })
);

const Title = (content) => (
  <Box
    sx={{
      ...flexCenterStyle,
      marginBottom: "24px",
    }}
  >
    <Typography
      sx={{
        ...TEXT_STYLE.h2,
        fontFamily: FONT_FAMILY,
        color: COLORS.purple,
      }}
    >
      {content}
    </Typography>
    <Box sx={{ marginLeft: "11.3px", marginTop: "6px" }}>
      <RightArrow />
    </Box>
  </Box>
);

export default function HomeContent(props) {
  const navigationNewContentPrevRef = useRef(null);
  const navigationNewContentNextRef = useRef(null);

  let num_items_per_line =
    props.windowSize.width > SCREEN_BREAKPOINTS.sm ? 5 : 3;

  return (
    <Main open={props.open}>
      <HomeCarousel windowWidth={props.windowSize.width}></HomeCarousel>
      <Grid container spacing={2}>
      <Grid item xs={9}>
          <Box
            sx={{
              margin: "107px 48px 56px 48px",
            }}
          >
            {Title("Gợi ý cho người chưa bắt đầu")}
            <Swiper
              slidesPerView={num_items_per_line}
              spaceBetween={20}
              style={{ marginTop: 35 }}
            >
              {fakeSuggest.map((item) => (
                <SwiperSlide key={item.id}>
                  <Thumbnail
                    style={{ width: "100%", height: "100%", borderRadius: 3 }}
                    avtSrc={item.avtSrc}
                    alt={`images ${item.id}`}
                  ></Thumbnail>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          {fakeData.map((data) => (
            <Box
              sx={{
                margin: "0 48px 56px 48px",
              }}
              key={data.title}
            >
              {Title(data.title)}
              {/* {data.categories && CatetoryBar(data.categories)} */}
              <Swiper
                slidesPerView={num_items_per_line}
                spaceBetween={20}
                style={{ marginTop: 35 }}
              >
                {data.items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Thumbnail
                      style={{ width: "100%", height: "100%", borderRadius: 3 }}
                      avtSrc={item.avtSrc}
                      alt={`images ${item.id}`}
                    ></Thumbnail>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Thumbnail
                style={{ width: "100%", height: "100%", borderRadius: 3 }}
                avtSrc={"https://picsum.photos/201/201?img=1"}
                alt={`images 1`}
              ></Thumbnail>
            </SwiperSlide>
            <SwiperSlide>
              <Thumbnail
                style={{ width: "100%", height: "100%", borderRadius: 3 }}
                avtSrc={"https://picsum.photos/201/201?img=1"}
                alt={`images 1`}
              ></Thumbnail>
            </SwiperSlide>
            <SwiperSlide>
              <Thumbnail
                style={{ width: "100%", height: "100%", borderRadius: 3 }}
                avtSrc={"https://picsum.photos/201/201?img=1"}
                alt={`images 1`}
              ></Thumbnail>
            </SwiperSlide>
            <SwiperSlide>
              <Thumbnail
                style={{ width: "100%", height: "100%", borderRadius: 3 }}
                avtSrc={"https://picsum.photos/201/201?img=1"}
                alt={`images 1`}
              ></Thumbnail>
            </SwiperSlide>
            ...
          </Swiper> */}
            </Box>
          ))}
          {/* <Box
            sx={{
              padding: "32px 48px 23px 48px",
              backgroundColor: COLORS.bg2,
              position: "relative",
            }}
          >
            {Title("Nội dung mới cho bạn")}
            <Swiper
              navigation={{
                prevEl: navigationNewContentPrevRef.current,
                nextEl: navigationNewContentNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl =
                  navigationNewContentPrevRef.current;
                swiper.params.navigation.nextEl =
                  navigationNewContentNextRef.current;
              }}
              slidesPerView={num_items_per_line}
              spaceBetween={20}
            >
              {newContent.map((item) => (
                <SwiperSlide key={item.id}>
                  <Thumbnail
                    style={{
                      borderRadius: "6px",
                      width: "100%",
                      height: "100%",
                    }}
                    avtSrc={"https://picsum.photos/201/201?img=1"}
                    alt={`images ${item.id}`}
                  ></Thumbnail>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              style={{
                ...SwiperBtnPrev(props),
              }}
              ref={navigationNewContentPrevRef}
            >
              <CarouselPrev></CarouselPrev>
            </div>
            <div
              style={{
                ...SwiperBtnNext(props),
              }}
              ref={navigationNewContentNextRef}
            >
              {" "}
              <CarouselNext></CarouselNext>
            </div>
          </Box> */}

          {/* <Box
            sx={{
              margin: "60px 48px",
            }}
          >
            {Title("Tác giả nổi bật")}
            <Swiper slidesPerView={num_items_per_line} spaceBetween={20}>
              {authors.map((item) => (
                <SwiperSlide key={item.id}>
                  <Thumbnail
                    style={{ borderRadius: "50%", width: "80%", height: "80%" }}
                    avtSrc={item.avtSrc}
                    alt={`images ${item.id}`}
                  ></Thumbnail>
                  <Typography
                    sx={{
                      ...(props.windowSize.width > SCREEN_BREAKPOINTS.sm
                        ? TEXT_STYLE.title1
                        : TEXT_STYLE.title3),
                      color: COLORS.white,
                      letterSpacing: 0,
                      marginTop: "22px",
                    }}
                  >
                    Vũ trọng phụng
                  </Typography>
                  <Typography
                    sx={{
                      ...(props.windowSize.width > SCREEN_BREAKPOINTS.sm
                        ? TEXT_STYLE.VZ_Caption_2
                        : TEXT_STYLE.caption10Regular),
                      color: COLORS.VZ_Text_content,
                      display: "-webkit-box",
                      marginTop: "8px",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Vũ Trọng Phụng là một nhà văn, nhà báo nổi tiếng của Việt
                    Nam giai đo ...
                  </Typography>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box> */}
        </Grid>  
        <Grid item xs={3}>
          <PlaylistRanking />
        </Grid>
      </Grid>
    </Main>
  );
}
