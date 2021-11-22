import styled from "styled-components/macro";
import media from "../utils/media";

const Styled = {
  MainContainer: styled.div`
    display: flex;
    justify-content: center;
  `,
  MainWrapper: styled.div`
    ${media.greaterThan("md")`
    max-width: 35rem;
    margin: 0 auto;
  `}
  `,
};

export default Styled;
