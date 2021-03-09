import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ stock, colors = [], id, images, name, price }) => {
  const { addToCard } = useCartContext();
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const img = images[0].thumbnails.large.url;
  const productCart = { amount, mainColor, id, name, price, img, stock };
  const increase = () => {
    setAmount((oldAmount) => {
      const newAmount = oldAmount + 1;
      if (newAmount > stock) {
        return stock;
      }
      return newAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      const newAmount = oldAmount - 1;
      if (newAmount < 0) {
        return 0;
      }
      return newAmount;
    });
  };
  return (
    <Wrapper>
      <div className='colors'>
        <span>colors :</span>
        <div>
          <div>
            {colors.map((color, index) => {
              return (
                <button
                  key={id}
                  className={
                    color === mainColor ? 'color-btn active' : 'color-btn'
                  }
                  style={{ background: color }}
                  onClick={() => setMainColor(color)}
                >
                  {mainColor === color && <FaCheck />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <section className='content'>
        <AmountButtons
          stock={stock}
          increase={increase}
          decrease={decrease}
          id={id}
          amount={amount}
        />
        <Link
          className='btn'
          to='/cart'
          onClick={() => addToCard(productCart, mainColor)}
        >
          add to cart
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
