import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <main>
        <PageHero title='checkout' />
        <Wrapper className='page'>
          <div className='empty'>
            <h2>Your cart is empty</h2>
            <Link className='btn' to='/products'>
              fill it
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        <StripeCheckout />
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
