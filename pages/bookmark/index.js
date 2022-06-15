import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Layout from '../../components/layout/Layout';
import ReactAudioPlayer from 'react-audio-player';
import Thumbnail from '../../components/Thumbnail/Thumbnail';
import { TEXT_STYLE, FONT_FAMILY, COLORS } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
// import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';

const UnitItem = styled('div')((props) => ({
    backgroundColor: props.active ? 'rgba(196, 196, 196, 0.3)' : '',
    display: 'flex',
    padding: '0px 12px',
    alignItems: 'center',
    width: '100%',
    height: '56px',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '266px',
    ':hover': {
        backgroundColor: 'rgba(196, 196, 196, 0.3)',
    },
}));

const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { jwt, cart } = useSelector((state) => state.storeManage);
    const [bookmarks, setBookmark] = useState([]);

    useEffect(() => {
        async function getBookmarks() {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookmark`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status == 200) {
                if (res.data.success == true) {
                    const data = res.data.data;
                    setBookmark(data);
                }
            }
        }

        if (jwt != 'null') {
            getBookmarks();
        }
    }, [jwt]);

    return (
        <>
            <Container sx={{ marginBottom: 4 }} component="main" maxWidth="lg">
                <Typography
                    sx={{
                        ...TEXT_STYLE.h2,
                        fontFamily: FONT_FAMILY,
                        color: COLORS.purple,
                        marginTop: 12,
                    }}
                >
                    Sách đã lưu
                </Typography>
                <Box sx={{ height: 'auto', width: '100%', padding: '24px 0px' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {bookmarks.map((bookmark, key) => (
                            <Grid key={key} item xs="auto">
                                <Box
                                    onClick={() => router.push(`/book/${bookmark.bookId.slug}`)}
                                    sx={{ width: 200, height: 200 }}
                                >
                                    <Thumbnail
                                        style={{ width: '100%', height: '100%', borderRadius: 3, cursor: 'pointer' }}
                                        avtSrc={bookmark.bookId.thumbnail}
                                        alt={bookmark.bookId.thumbnail}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};
export default Index;

Index.layout = Layout;
