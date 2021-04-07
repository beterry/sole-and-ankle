import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const STYLES = {
    'on-sale': {
      title: 'Sale',
      color: COLORS.primary,
    },
    'new-release': {
      title: 'Just Released!',
      color: COLORS.secondary,
    },
    'default': {
      title: '',
      color: 'red',
    },
  }

  const style = STYLES[variant];
  if (!style) throw new Error('Invalid variant in ShoeCard');

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color': variant === 'on-sale' ? COLORS.gray[700] : undefined,
              '--text-decoration': variant === 'on-sale' ? 'line-through' : undefined,
            }}
          >{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
        <VarientTag style={{
          '--color': style.color,
          '--display': variant === 'default' ? 'none' : 'block',
        }}>{style.title}</VarientTag>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;

  flex: 1 1 340px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;

  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;

  justify-content: space-between;

  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const VarientTag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  width: fit-content;
  background: var(--color);
  color: white;
  padding: 8px 12px;
  display: var(--display);
`

export default ShoeCard;
