import React, { useState } from 'react';
import styled from 'styled-components';

const ProductImages = ({ imgs = [{ url: ' ' }] }) => {
  const [indexs, setIndex] = useState(0);

  return (
    <Wrapper>
      <img src={imgs[indexs].url} className='main ' />
      <div className='gallery'>
        {imgs.map((img, index) => {
          return (
            <img
              src={img.url}
              alt=''
              key={index}
              className={index === indexs ? 'active' : null}
              onClick={() => setIndex(index)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
