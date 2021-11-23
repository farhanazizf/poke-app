import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";
import media from "../../utils/media";

const Styled = {
  SectionList: styled.section`
    padding: 12px 24px;
    flex-wrap: nowrap;

    div.listTitle {
      p {
        font-weight: 700;
        font-size: 24px;
      }
    }

    .listWrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  `,
  ItemWrapper: styled.div`
    position: relative;
    cursor: pointer;
    margin: 1rem 0;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    min-height: 200px;
    max-height: 200px;
    overflow: hidden;

    max-width: 14rem;
    min-width: 14rem;
    ${media.lessThan("screen414")`
    max-width: 160px;
    min-width: 160px;
    `}
    ${media.lessThan("screen375")`
    max-width: 150px;
    min-width: 150px;
    `}
  `,
  ImgWrapper: styled.div`
    padding: 8px 12px;
    overflow: hidden;

    display: flex;
    justify-content: center;
    height: 90%;
    img.pokemon {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `,
  DescWrapper: styled.div`
    // background: #f9f9f9;
    background-image: linear-gradient(
      to bottom,
      rgba(249, 249, 249, 0) 0%,
      rgba(255, 255, 255, 1)
    );
    position: absolute;
    padding: 12px;
    bottom: 0;
    border-radius: 10px;
    // width: 100%;
    max-width: 14rem;
    min-width: 14rem;
    ${media.lessThan("screen414")`
    max-width: 160px;
    min-width: 160px;
    `}
    ${media.lessThan("screen375")`
    max-width: 150px;
    min-width: 150px;
    `}
    p {
      width: fit-content;
      margin: 0;
      margin-top: 8px;
    }
    p.pokemonName {
      font-weight: 700;
      font-size: 18px;
    }
    p.pokemonId {
      font-size: 15px;
    }
  `,
  SkeletonWrapper: styled.div`
    margin: 1rem 0;
    min-height: 200px;
    max-height: 200px;
    overflow: hidden;

    max-width: 14rem;
    min-width: 14rem;

    ${media.lessThan("screen414")`
    max-width: 160px;
    min-width: 160px;
    `}
    ${media.lessThan("screen360")`
    max-width: 150px;
    min-width: 150px;
    `}
    ${media.lessThan("screen375")`
    max-width: 150px;
    min-width: 150px;
    `}
  `,
};

export const CardPokemon: React.FC<{ name: string; id: string }> = ({
  name = "",
  id,
}) => {
  return (
    <Styled.ItemWrapper>
      <Styled.ImgWrapper>
        <img
          className="pokemon"
          src={`https://img.pokemondb.net/artwork/large/${name.toLowerCase()}.jpg`}
          alt={name}
        />
      </Styled.ImgWrapper>
      <Styled.DescWrapper>
        <p className="pokemonId">{id}</p>
        <p className="pokemonName">{name}</p>
      </Styled.DescWrapper>
    </Styled.ItemWrapper>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <Styled.SkeletonWrapper>
      <Skeleton variant="rectangular" width={160} height={160} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Styled.SkeletonWrapper>
  );
};

export default Styled;
