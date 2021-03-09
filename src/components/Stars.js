import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars = 0, reviews }) => {
  const fillStar = Math.floor(stars);
  console.log(fillStar);
  const fillStarARR = Array.from(Array(fillStar).keys());
  const restStar = stars - fillStar;
  let halfStar;
  let halfStarARR;
  if (restStar > 0.5) {
    halfStar = 1;
    halfStarARR = Array.from(Array(halfStar).keys());
  } else {
    halfStar = 0;
    halfStarARR = Array.from(Array(halfStar).keys());
  }
  const bsStar = 5 - halfStar - fillStar;
  const bsStarARR = Array.from(Array(bsStar).keys());
  console.log(bsStarARR);

  return (
    <Wrapper>
      {fillStarARR.map((a) => {
        return (
          <span>
            <BsStarFill />
          </span>
        );
      })}
      {halfStarARR.map((a) => {
        return (
          <span>
            <BsStarHalf />
          </span>
        );
      })}
      {bsStarARR.map((a) => {
        return (
          <span>
            <BsStar />
          </span>
        );
      })}

      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
