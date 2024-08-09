import styled from 'styled-components';
import Skeleton from '../../../components/Skeleton';

export const Container = styled.section`
  display: flex;
  padding: 1.5rem 5%;
  width: 100%;
  justify-content: center;
  gap: 2rem;
  flex-direction: column;
`;

export const ShimmerBackPage = styled(Skeleton)`
  width: 200px;
  height: 40px;
  margin-top: 12px;
  border-radius: 8px;
`;

export const ShimmerPurchase = styled(Skeleton)`
  width: 100%;
  height: 250px;
  margin-top: 12px;
  border-radius: 8px;
`;

export const EmptyPurchase = styled.p`
  color: #fff;
  width: fit-content;
  margin: 0 auto;
`;
