import { ChevronLeftOutlined } from "@mui/icons-material";
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
    ${media.greaterThan("sm")`
    max-width: 35rem;
    margin: 0 auto;
  `}
  `,
  IconChevron: styled(ChevronLeftOutlined)`
    &&& {
      z-index: 1;
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 32px;
      color: white;
    }
  `,
};

export default Styled;
