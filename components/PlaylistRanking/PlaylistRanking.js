// import react
import { useEffect, useState } from 'react';

// import next link
import Link from 'next/link';

// import swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


// import MUI component
import {
    Box,
    Typography,
    Chip,
    colors
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StarIcon from '@mui/icons-material/Star';

// import icons
import {
    AudioBook
} from '../Icons/index'


// import utils
import { flexStyle } from '../../utils/flexStyle'
import { TEXT_STYLE, COLORS, SCREEN_BREAKPOINTS } from '../../utils/constants';
import useWindowSize from '../../utils/useWindowSize';

// // import service
// import API from '../../services/api';


const rankingType = [
    {
        id: 'sachnoi',
        name: 'Sách nói'
    },
    {
        id: 'podcast',
        name: 'Podcast'
    },

]

export default function PlaylistRanking() {
    // const api = new API();

    const windowSize = useWindowSize();
    const isSm = windowSize.width <= SCREEN_BREAKPOINTS.sm ? true : false;
    const [playlists, setPlaylists] = useState([
        { id: 1, avtSrc: "https://picsum.photos/201/201?img=1" },
        { id: 2, avtSrc: "https://picsum.photos/201/201?img=2" },
        { id: 3, avtSrc: "https://picsum.photos/201/201?img=3" },
        { id: 4, avtSrc: "https://picsum.photos/201/201?img=4" },
        { id: 5, avtSrc: "https://picsum.photos/201/201?img=5" },
        { id: 6, avtSrc: "https://picsum.photos/201/201?img=5" },
  
      ]);
    const [tab, setTab] = useState('audio_book');
    const [type, setType] = useState('sachnoi');

    // useEffect(() => {
    //     async function fetchPlaylistRanking() {
    //         const res = await api.getPlaylistRanking(type, tab);
    //         const data = res.data.data;
    //         setPlaylists(data);
    //     }

    //     fetchPlaylistRanking();
    // }, [tab, type]);



    const handleTabClick = (e) => {
        const id = e.currentTarget.id;
        setTab(id)
        e.stopPropagation();
    };

    const handleClickType = (e) => {
        const id = e.currentTarget.id;
        setType(id)
        e.stopPropagation();
    }

    return (
        <Box
            sx={{
                width: '100%'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '20vh',
                    mixBlendMode: 'normal',
                    ...flexStyle('center', 'center'),
                    position: 'relative'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Work Sans',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: '24px',
                        // lineHeight: '72px',
                        color: COLORS.purple,
                        zIndex: 2
                    }}
                >
                    Bảng xếp hạng
                </Typography>
            </Box>
        
            <Box
                sx={{
                    width: '100%',
                    ...flexStyle('center', 'flex-start')
                }}
            >
                <Box
                    sx={{
                        // mt: isSm ? '32px' : '36px',
                        mt: '10px',
                        width: isSm ? '90%' : '40%',
                        ...(!isSm && { minWidth: '300px' })
                    }}
                >
                    <Box
                        sx={{
                            // ...flexStyle('flex-start', 'center'),
                            ...flexStyle('center', 'center'),
                            columnGap: '32px',
                            borderBottom: `1px solid ${COLORS.bg2}`,
                            // pb: '16px',
                            boxSizing: 'border-box'
                        }}
                    >
                        {
                            rankingType.map(i => (
                                <Chip
                                    id={i.id}
                                    key={i.id}
                                    label={i.name}
                                    sx={{
                                        bgcolor: (i.id === type) ? COLORS.purple : '#C4C4C4',
                                        color: COLORS.white,
                                        ...TEXT_STYLE.title1,
                                        ':hover': {
                                            bgcolor: COLORS.purple
                                        }
                                    }}
                                    onClick={handleClickType}
                                />
                            ))
                        }

                    </Box>
                    {
                        playlists.map((i, idx) => (
                            <Box
                                key={i?.id}
                                sx={{
                                    width: '100%',
                                    height: isSm ? '96px' : '116px',
                                    ...flexStyle('flex-start', 'center'),
                                    columnGap: '22px',
                                    bgcolor: COLORS.bg2,
                                    mt: '40px',
                                    borderRadius: '6px'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        bgcolor: COLORS.bg3,
                                        ...flexStyle('center', 'center'),
                                        borderTopLeftRadius: '6px',
                                        borderBottomLeftRadius: '6px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            ...(isSm ? TEXT_STYLE.h3 : TEXT_STYLE.h2),
                                            color: COLORS.white
                                        }}
                                    >{(idx + 1) <= 9 ? `0${idx + 1}` : (idx + 1)}</Typography>
                                </Box>
                                <Link
                                    href={`/playlists/${i?.id}`}
                                    style={{ textDecoration: 'none', width: 'calc(85% - 22px)' }}
                                >
                                    <Box
                                        sx={{
                                            ...flexStyle('flex-start', 'center'),
                                            columnGap: '24px',
                                            p: '8px 0',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={i?.avatar?.thumb_url}
                                                alt={`image ${i?.name}`}
                                                style={{
                                                    width: isSm ? '80px' : '100px',
                                                    height: isSm ? '80px' : '100px'
                                                }}
                                            />
                                        </Box>
                                        <Box
                                        >
                                            <Typography
                                                sx={{
                                                    ...(isSm ? TEXT_STYLE.title1 : TEXT_STYLE.h3),
                                                    color: COLORS.white,
                                                    mb: '8px',
                                                    display: '-webkit-box',
                                                    textOverflow: 'ellipsis',
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}
                                            // >{i?.name}</Typography>
                                             >Vu Trong Phung</Typography>
                                            <Box
                                                sx={{
                                                    ...flexStyle('flex-start', 'center'),
                                                    columnGap: '8px',
                                                    mb: isSm ? '4px' : '16px'
                                                }}
                                            >
                                                <AccountCircleOutlinedIcon sx={{
                                                    color: COLORS.contentIcon,
                                                    ...(isSm && {
                                                        width: '16px',
                                                        height: '16px'
                                                    })
                                                }} />
                                                <Typography
                                                    sx={{
                                                        ...(isSm ? TEXT_STYLE.content2 : TEXT_STYLE.content1),
                                                        color: COLORS.contentIcon
                                                    }}
                                                // >{i?.author_string}</Typography>
                                                >Vu Trong Phung</Typography>
                                                    
                                            </Box>
                                            <Box
                                                sx={{
                                                    ...flexStyle('flex-start', 'center'),
                                                    columnGap: '8px'
                                                }}
                                            >
                                                <StarIcon sx={{
                                                    color: COLORS.second,
                                                    ...(isSm && {
                                                        width: '16px',
                                                        height: '16px'
                                                    })
                                                }} />
                                                <Typography
                                                    sx={{
                                                        ...(isSm ? TEXT_STYLE.content2 : TEXT_STYLE.content1),
                                                        color: COLORS.contentIcon
                                                    }}
                                                // >{i?.playlist_counter?.content_avg} ({i?.playlist_counter?.ratings_count})</Typography>
                                             >Vu Trong Phung</Typography>

                                            </Box>
                                        </Box>
                                    </Box>
                                </Link>

                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box >
    )
}