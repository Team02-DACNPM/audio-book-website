import React, { useState } from 'react';

// MUI COMPONENTS
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Utils
import getPriceString from '../../utils/getPriceString';
import getTotalPrice from '../../utils/getTotalPrice';
import Layout from '../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { destroyCart } from '../../redux/storeManage';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function payment() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { jwt, cart } = useSelector((state) => state.storeManage);
    const [items, setItems] = useState(cart.books);
    const [selectedPayment, setSelectedPayment] = useState('vnpay');

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const handlePaymentClick = async () => {
        if (getTotalPrice(items) <= 0) {
            return toast.error('Giỏ hàng trống!');
        }
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/payment`,
            { books: items, paymentName: selectedPayment, total: getTotalPrice(items) },
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
                toast.success('Thanh toán thành công');
                dispatch(destroyCart());
                router.push('/');
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Toolbar />
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h6" fontWeight="400" sx={{ color: '#535BFE', mb: 2 }}>
                        THANH TOÁN
                    </Typography>
                    <Divider />
                    <FormControl sx={{ mt: 2 }}>
                        <RadioGroup value={selectedPayment} onChange={handlePaymentChange}>
                            <FormControlLabel
                                value="vnpay"
                                control={<Radio />}
                                label={
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={2}>
                                            <img className="h-10 w-full" src="/images/vnpay.png" />
                                        </Grid>
                                        <Grid item xs={10} alignSelf="center">
                                            <Typography variant="h6" fontWeight="400">
                                                Thanh toán qua thẻ hoặc VNPay QR code
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                sx={{ mb: 2 }}
                            />
                            <Divider />
                            <FormControlLabel
                                value="momo"
                                control={<Radio />}
                                label={
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={2}>
                                            <img className="h-10 w-full" src="/images/momo.png" />
                                        </Grid>
                                        <Grid item xs={10} alignSelf="center">
                                            <Typography variant="h6" fontWeight="400">
                                                Thanh toán qua Momo
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                sx={{ mb: 2, mt: 2 }}
                            />
                            <Divider />
                            <FormControlLabel
                                value="shopee"
                                control={<Radio />}
                                label={
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={2}>
                                            <img className="h-10 w-full" src="/images/shopee.png" />
                                        </Grid>
                                        <Grid item xs={10} alignSelf="center">
                                            <Typography variant="h6" fontWeight="400">
                                                Thanh toán qua Shopee
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                sx={{ mb: 2, mt: 2 }}
                            />
                            <Divider />
                            <FormControlLabel
                                value="appota"
                                control={<Radio />}
                                label={
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={2}>
                                            <img className="h-10 w-full" src="/images/appota.png" />
                                        </Grid>
                                        <Grid item xs={10} alignSelf="center">
                                            <Typography variant="h6" fontWeight="400">
                                                Thanh toán qua Thẻ Nội địa/Quốc tế/QR AppotaPay
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                sx={{ mb: 2, mt: 2 }}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item container xs={4} direction="column">
                    <Grid item>
                        <Typography variant="h6" fontWeight="400" sx={{ color: '#535BFE', mb: 2 }}>
                            THÔNG TIN ĐƠN HÀNG
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                background: '#c4c4c41a',
                                mt: 2,
                                p: 2,
                                pb: 1,
                                pr: 3,
                            }}
                        >
                            <Grid container direction="column">
                                {items.map((item, index, array) => {
                                    return (
                                        <div key={index}>
                                            <Grid item container justifyContent="space-between">
                                                <Grid item xs={9}>
                                                    <Typography variant="h6" fontSize="1.125rem" fontWeight="300">
                                                        {item.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="h6" fontSize="1.125rem" fontWeight="300">
                                                        {getPriceString(item.prices)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Divider sx={{ my: 1 }} />
                                            </Grid>
                                        </div>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item container justifyContent="space-between">
                        <Grid item xs={4} alignSelf="flex-start">
                            <Typography color="#535BFE" textAlign="right" variant="h6" fontWeight="400">
                                Tổng
                            </Typography>
                        </Grid>
                        <Grid item alignSelf="flex-end">
                            <Typography color="#535BFE" variant="h4">
                                {getPriceString(getTotalPrice(items))}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography color="#535BFE" fontWeight="500" variant="h6">
                            MÃ GIẢM GIÁ
                        </Typography>
                    </Grid>
                    <Grid item container sx={{ mt: 2 }}>
                        <Grid item xs={9}>
                            <TextField
                                size="small"
                                sx={{
                                    background: '#4C4C4C1A',
                                    height: '100%',
                                    borderRadius: '16px 0px 0px 16px',
                                    '& > .MuiFilledInput-root': {
                                        borderRadius: '16px 0px 0px 16px',
                                    },
                                }}
                                placeholder="Nhập mã giảm giá (nếu có)"
                                variant="filled"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                // size="small"
                                sx={{
                                    textTransform: 'none',
                                    background: '#535BFE',
                                    borderRadius: '0px 16px 16px 0px',
                                    height: '100%',
                                    '&:hover': {
                                        background: '#535BFE',
                                    },
                                }}
                                fullWidth
                            >
                                Sử dụng
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="space-between" sx={{ mt: 3 }}>
                        <Grid item xs={4} alignSelf="flex-start">
                            <Typography color="#535BFE" textAlign="right" variant="h6" fontWeight="400">
                                Thành tiền
                            </Typography>
                        </Grid>
                        <Grid item alignSelf="flex-end">
                            <Typography color="#535BFE" variant="h4">
                                {getPriceString(getTotalPrice(items))}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item alignSelf="flex-end" sx={{ mt: 2.5 }}>
                        <Button
                            variant="contained"
                            sx={{
                                background: '#FB2C2C',
                                '&:hover': {
                                    background: '#FB2C2C',
                                },
                                borderRadius: 6,
                                fontWeight: 300,
                            }}
                            size="large"
                            onClick={handlePaymentClick}
                        >
                            Thanh toán
                        </Button>
                    </Grid>
                    <Grid item alignSelf="flex-end" sx={{ mt: 1 }}>
                        <Typography sx={{ fontStyle: 'oblique' }}>Bạn muốn chuyển khoản ?</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

payment.layout = Layout;
