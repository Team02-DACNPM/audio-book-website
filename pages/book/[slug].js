import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Layout from '../../components/layout/Layout';
import ReactAudioPlayer from 'react-audio-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addBooksToCart } from '../../redux/storeManage';
import Link from 'next/link';

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

const Index = ({ book, audios }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { jwt, cart } = useSelector((state) => state.storeManage);
    const [audioIndex, setAudioIndex] = useState(0);
    const [canHear, setCanHear] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);

    useEffect(() => {
        async function getUserInfo() {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/account/profile`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status == 200) {
                if (res.data.success == true) {
                    const data = res.data.data.user;
                    if (moment(data.isVip).isAfter(moment())) {
                        setCanHear(true);
                    }
                }
            }
        }

        async function getPayment() {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status == 200) {
                if (res.data.success == true) {
                    const data = res.data.data;
                    data.map((item) => {
                        item.books.map((b) => {
                            if (b._id == book._id) {
                                setCanHear(true);
                            }
                        });
                    });
                }
            }
        }

        async function getBookmark() {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookmark/${book._id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status == 200) {
                if (res.data.success == true) {
                    const data = res.data.data;
                    console.log(data);
                    setIsBookmark(true);
                }
            }
        }

        if (jwt != 'null') {
            getUserInfo();
            getPayment();
            getBookmark();
        }
        if (book.isVip == false) {
            setCanHear(true);
        }
    }, [jwt, isBookmark]);

    function handleAddToCart() {
        dispatch(addBooksToCart(book));
        router.push('/checkout/cart');
    }

    async function handleCheckBookmark(e) {
        const check = e.target.checked;
        setIsBookmark(check);
        if (check) {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/bookmark/`,
                { bookId: book._id },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                },
            );
            if (res.status == 200) {
                if (res.data.success == true) {
                    const data = res.data.data;
                    console.log(data);
                }
            }
        } else {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/bookmark/${book._id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status == 200) {
                if (res.data.success == true) {
                    const data = res.data.data;
                    console.log(data);
                }
            }
        }
    }

    return (
        <>
            <Container sx={{ marginBottom: 4 }} component="main" maxWidth="lg">
                <Box sx={{ height: 'auto', width: '100%', padding: '38px 0px' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={4}>
                            <Grid item xs="auto">
                                <Box sx={{ width: 312, height: 'auto' }}>
                                    <Avatar
                                        variant="square"
                                        sx={{ width: 312, height: 312, borderRadius: 6 }}
                                        src={book.thumbnail}
                                    />
                                    <div className="pb-4" />
                                    <p className="text-xl font-medium pb-4 leading-8">{book.name}</p>
                                    <p className="text-lg pb-4">Tác giả: {book.author}</p>
                                    <p className="text-lg pb-4">Kênh: {book.channel}</p>
                                    <p className="text-lg pb-4">
                                        Giá:{' '}
                                        {book.prices.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} đ
                                    </p>
                                    <p className="text-lg pb-4">Lượt xem: {book.views}</p>
                                    {jwt != 'null' && (
                                        <FormControlLabel
                                            onChange={handleCheckBookmark}
                                            checked={isBookmark}
                                            label={<p className="text-lg text-[#1976d2]">Đánh dấu sách</p>}
                                            control={<Checkbox />}
                                        />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs>
                                <Box>
                                    <p className="text-xl font-medium pb-4 text-blue-600/100">Lời tựa</p>
                                    <p className="text-lg pb-4">{book.description}</p>
                                    {/* <Button startIcon={<PlayArrowIcon />} size="large" variant="contained">
                                        Phát tất cả
                                    </Button> */}
                                    {/* <div className="pb-8" /> */}
                                    {canHear == true ? (
                                        audios.map((audio, key) => (
                                            <UnitItem
                                                onClick={() => setAudioIndex(key)}
                                                key={key}
                                                active={audioIndex == key ? 1 : 0}
                                            >
                                                <p className="text-lg">{audio.name}</p>
                                            </UnitItem>
                                        ))
                                    ) : (
                                        <div>
                                            {jwt != 'null' ? (
                                                <>
                                                    <p className="text-lg pb-3">Vui lòng nâng cấp VIP để nghe!</p>
                                                    <Button
                                                        onClick={handleAddToCart}
                                                        startIcon={<ShoppingCartIcon />}
                                                        size="large"
                                                        variant="contained"
                                                    >
                                                        Mua lẻ sách
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="flex">
                                                    Vui lòng
                                                    <div className="text-blue-500 font-bold px-1">
                                                        <Link href="/auth/signin">đăng nhập</Link>
                                                    </div>
                                                    để trải nghiệm tính năng này!
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <div className="pb-8" />
                <Box
                    sx={{
                        bgcolor: '#3f51b5',
                        height: 'auto',
                        width: '100%',
                        padding: '38px',
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <div className="w-full h-full flex justify-center items-center">
                                {/* <SkipPreviousIcon sx={{ fontSize: 60, color: 'white' }} />
                                <div className='w-3'/>
                                <RotateLeftOutlinedIcon sx={{ fontSize: 48, color: 'white' }} />
                                <div className='w-3'/>
                                <PlayCircleOutlineIcon sx={{ fontSize: 85, color: 'white' }} />
                                <div className='w-3'/>
                                <RotateRightOutlinedIcon sx={{ fontSize: 48, color: 'white' }} />
                                <div className='w-3'/>
                                <SkipNextIcon sx={{ fontSize: 60, color: 'white' }} /> */}
                                <ReactAudioPlayer
                                    src={canHear == true ? audios[audioIndex]?.url : ''}
                                    autoPlay
                                    controls
                                />
                            </div>
                        </Grid>
                        <Grid item xs="auto">
                            <Avatar sx={{ width: 136, height: 136 }} src={book.thumbnail} />
                        </Grid>
                        <Grid item xs>
                            <div className="w-full h-full flex justify-center text-xl font-semibold items-center text-white">
                                {book.name}
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};
export default Index;

Index.layout = Layout;

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CONTAINER_API_URL}/books/slug/${slug}`);
    if (res.status == 200) {
        if (res.data.success == true) {
            const book = res.data.data.book;
            // if (book.isVip == true) {
            //   return {
            //     props: {
            //       book,
            //       audios: {},
            //     },
            //   };
            // }
            const res2 = await axios.get(`${process.env.NEXT_PUBLIC_CONTAINER_API_URL}/books/${book._id}/audios`);
            if (res2.status == 200) {
                if (res2.data.success == true) {
                    const audios = res2.data.data.audios;
                    return {
                        props: {
                            book,
                            audios,
                        },
                    };
                }
            }
        }
    }
    return {
        props: {
            book: {},
            audios: {},
        },
    };
}
