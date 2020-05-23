import { ReactNode } from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
  border-radius: 8px;
  box-shadow: 0 8px 42px 0 rgba(0,0,0,0.2);
`;

interface CardProps {
  children: ReactNode;
}

const Card = (props: CardProps) => {
  const { children } = props;

  return (
    <CardDiv>
      {children}
    </CardDiv>
  );
};

export default Card;
