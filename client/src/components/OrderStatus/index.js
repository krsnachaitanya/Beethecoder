import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CartContext } from '../../pages/cart/cartContext';
import { UserContext } from '../../pages/user-account/userContext';
import { getDoc, updateDoc } from '../../utils/admin/adminapicall';
import PageTitle from '../PageTitle';

const OrderStatus = () => {
  let history = useHistory();
  const { user } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);
  const isPaid = history.location.search.split('=')[1];
  const [paymentStatus, setPaymentStatus] = useState('');
  const recentOrder =
    typeof window !== 'undefined' &&
    localStorage.getItem('recentOrder') &&
    JSON.parse(localStorage.getItem('recentOrder'));

  const getPaymentStatus = async () => {
    if (recentOrder && paymentStatus !== 'succeeded') {
      const data = await getDoc({
        token: user.token,
        link: '/checkout/sessions',
        id: recentOrder?.sessionId,
      });
      setPaymentStatus(data.paymentStatus);
    }
  };

  const updateOrder = async () => {
    if (recentOrder && paymentStatus === 'succeeded') {
      await updateDoc({
        token: user.token,
        json: true,
        link: '/orders/status',
        id: recentOrder?._id,
        data: { status: 'paid' },
      });
      localStorage.removeItem('recentOrder');
      clearCart();
    }
  };

  useEffect(() => {
    getPaymentStatus();
    updateOrder();
  }, [paymentStatus]);

  return (
    <div>
      <PageTitle
        title={isPaid === 'true' ? 'Payment Success' : 'Payment Falied'}
      />
    </div>
  );
};

export default OrderStatus;
