import React, { Fragment, useState } from 'react';

// MUI COMPONENTS
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// MY COMPONENTS
import CheckoutCartItem from '../../components/checkout/cart/CheckoutCartItem';

// Utils
import getPriceString from '../../utils/getPriceString';
import getTotalPrice from '../../utils/getTotalPrice';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';


export default function cart() {
    const dispatch = useDispatch();
    const { jwt, cart } = useSelector((state) => state.storeManage);
    const [items, setItems] = useState(cart.books);

    const handleClickRemoveCartItem = (id) => {
        setItems((prevItems) => {
            return prevItems.filter((item) => {
                return item._id !== id;
            });
        });
    };

    return (
        <Container maxWidth="lg">
            <Toolbar />
            <Grid container justifyContent="flex-start">
                <Grid item container direction="column" rowSpacing={3}>
                    <Grid item>
                        <Typography variant="h5" color="purple">
                            GIỎ HÀNG
                        </Typography>
                    </Grid>
                    {items.length === 0 ? (
                        <>
                            <Grid item sx={{ ml: 2 }}>
                                <Typography>Hiện tại không có sản phẩm nào trong giỏ hàng.</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" sx={{ textTransform: 'none', borderRadius: 6 }}>
                                    <Link href="/">Quay Lại Trang Chủ</Link>
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <Grid item container justifyContent="space-between" columnSpacing={2}>
                            <Grid item container xs={8} direction="column" rowSpacing={2}>
                                {items.map((item, index, array) => {
                                    return (
                                        <Fragment key={item._id}>
                                            <CheckoutCartItem {...item} onClick={handleClickRemoveCartItem} />
                                            <Grid item>{index < array.length - 1 && <Divider />}</Grid>
                                        </Fragment>
                                    );
                                })}
                            </Grid>

                            {/* Tổng tiền */}
                            <Grid item container direction="column" xs={4} rowSpacing={2}>
                                <Grid item>
                                    <Toolbar
                                        sx={{
                                            background: '#E7EBF0',
                                            borderRadius: 2,
                                            color: '#4824BD',
                                        }}
                                    >
                                        <Typography sx={{ flexGrow: 1 }} variant="caption">
                                            Tổng tiền
                                        </Typography>
                                        <Typography variant="h5">{getPriceString(getTotalPrice(items))}</Typography>
                                    </Toolbar>
                                </Grid>
                                <Grid item>
                                    <Link href={`/checkout/payment`}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 6,
                                                color: 'white',
                                                textTransform: 'none',
                                                background: 'red',
                                                fontWeight: 300,
                                                '&:hover': {
                                                    backgroundColor: 'red',
                                                },
                                            }}
                                            fullWidth
                                        >
                                            Tiến hành thanh toán
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

cart.layout = Layout;
