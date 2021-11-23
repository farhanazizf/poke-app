import styled from "styled-components/macro";
import { Box, LinearProgress } from "@mui/material";
import { feetDisplay, poundDisplay } from "../../utils/converter";

const Styled = {
  SectionDetails: styled.section`
    position: relative;
    // padding: 12px 24px;
  `,
  AvatarWrapper: styled.div`
    padding: 12px 24px;
    position: relative;
    min-height: 40%;
    max-height: 40%;
    p {
      margin: 5px 0;
    }
    img.pokemonAvatar {
      max-width: 100%;
    }
    p.pokemonType {
    }
  `,
  HeadWrap: styled.div`
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    p.pokemonName {
      color: white;
      font-weight: 700;
      font-size: 24px;
    }
    p.pokemonId {
      color: white;
      font-weight: 700;
      font-size: 18px;
    }
  `,
  ChipPokemon: styled.p<{ pokemonType: string }>`
    background: ${(props) =>
      props.theme.colors[`pokemon-${props.pokemonType}`]};
    padding: 5px 30px;
    margin: 0;
    margin-right: 10px;
    border-radius: 20px;
    color: white;
    text-transform: capitalize;
  `,
  OverlapWrap: styled.div`
    // position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 365px;
    min-height: 365px;
  `,
  BackgroundWrapper: styled.div<{ pokemonType: string }>`
    width: 100%;
    min-height: 350px;
    max-height: 350px;
    position: absolute;
    z-index: -1;
    border-radius: 0 0 45% 45%;
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      ${(props) => props.theme.colors[`bg-pokemon-${props.pokemonType}`]} 40%
    );
  `,
  BorderLinearProgress: styled(LinearProgress)`
    &&& {
      border-radius: 5px;
      height: 10px;
    }
  `,
  FlexWrap: styled.div<{ pokeType?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    div.infoWrapper {
      text-align: center;
      h2 {
        font-size: 18px;
        text-transform: capitalize;
      }
      p {
        font-size: 15px;
        color: ${(props) =>
          props.theme.colors[`pokemon-${props.pokeType || "unknown"}`]};
      }
    }
    div {
      color: ${(props) =>
        props.theme.colors[`pokemon-${props.pokeType || "unknown"}`]};
    }
    div.statName {
      width: 20%;
      text-transform: capitalize;
    }
    div.statsVal {
      width: 10%;
      font-weight: 700;
    }
    div.statsIndicator {
      width: 60%;
    }
  `,
  DescWrap: styled.div`
    padding: 12px 24px;
  `,
  Divider: styled.div<{ pokemonType: string; height?: string }>`
    border: 0.3px solid
      ${(props) => props.theme.colors[`pokemon-${props.pokemonType}`]};
    height: ${(props) => props.height ?? "100px"};
    margin: 0 30px;
  `,
  TabWrapper: styled.div`
    margin-top: 20px;

    .tabsz {
      font-size: 15px;
    }
    .tabsz.Mui-selected {
      font-weight: 700;
    }
    div.aboutWrapper {
      p.flavour {
        margin-top: 40px;
      }
    }
  `,
  AboutWrapper: styled.div<{ pokeType?: string }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: ${(props) =>
      props.theme.colors[`pokemon-${props.pokeType || "unknown"}`]};

    div.labelName {
      width: 30%;
      text-transform: capitalize;
      margin-right: 20px;
      color: black;
    }
    div.valueProf {
      text-transform: capitalize;
      font-weight: 700;
    }
  `,
};

export const CustomizedProgressBars: React.FC<{ value: number }> = ({
  value,
}) => {
  // console.log(value);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Styled.BorderLinearProgress variant="determinate" value={value} />
    </Box>
  );
};
export const StatsInfo: React.FC<{
  type: string;
  value: number;
  statName: string;
}> = ({ type, value, statName }) => {
  // console.log(value);
  return (
    <Styled.FlexWrap pokeType={type}>
      <div className="statName">
        <p>{statName}</p>
      </div>
      <Styled.Divider height="70px" pokemonType={type || "unknown"} />
      <div className="statsVal">
        <p>{value}</p>
      </div>
      <div className="statsIndicator">
        <CustomizedProgressBars value={(100 / 200) * value} />
      </div>
    </Styled.FlexWrap>
  );
};

export const InfoDivider: React.FC<{
  weight: number;
  type: string;
  height: number;
  habitat: string;
}> = ({ weight, type, height, habitat }) => {
  return (
    <Styled.FlexWrap>
      <div className="infoWrapper">
        <h2>{poundDisplay(weight)}kg</h2>
        <p>Weight</p>
      </div>
      <Styled.Divider pokemonType={type} />
      <div className="infoWrapper">
        <h2>{habitat || "unknown"}</h2>
        <p>Habitat</p>
      </div>
      <Styled.Divider pokemonType={type} />
      <div className="infoWrapper">
        <h2>{feetDisplay(height)}m</h2>
        <p>Height</p>
      </div>
    </Styled.FlexWrap>
  );
};
export const InfoWithLabel: React.FC<{
  type: string;
  label: string;
}> = ({ type, label, children }) => {
  return (
    <Styled.AboutWrapper pokeType={type}>
      <div className="labelName">
        <p>{label}</p>
      </div>

      <div className="valueProf">{children}</div>
    </Styled.AboutWrapper>
  );
};

export default Styled;
