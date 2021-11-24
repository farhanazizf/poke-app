import { CircularProgress, Skeleton } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/main-layout";
import BasicTabs, { TabPanel } from "../../components/tabs";
import useToast from "../../components/toast";
import http from "../../utils/http";
import Styled, { InfoDivider, InfoWithLabel, StatsInfo } from "./style";
import { initialTab, IPokemonDetail, ISpecies } from "./types";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [Toast, setToast] = useToast();
  const [loading, setLoading] = React.useState(false);
  const [pokemon, setPokemon] = React.useState<IPokemonDetail>();
  const [species, setSpecies] = React.useState<ISpecies>();
  const [tabValue, setTabValue] = React.useState<string>(
    initialTab[0].category
  );

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await http.get(`/pokemon/${id}`);

        // console.log(data);
        // setPokemon(data);
        setPokemon(data);
      } catch (error) {
        setToast({ message: "Error get data" });
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upperFirst = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const idPokemon = (word: string) => {
    let id = word || "";

    if (id?.length > 3) {
      return id || "-";
    }

    return ("00" + word)?.slice(-3) || "-";
  };

  const handleChange = async (newValue: string) => {
    setTabValue(newValue);
    if (newValue === "about") {
      try {
        setLoading(true);
        const { data } = await http.get(pokemon?.species.url ?? "/pokemon");
        setTimeout(() => setSpecies(data), 1000);
        // setSpecies(data);
      } catch (error) {
        setToast({ message: "Fail to Get Data" });
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
  };

  return (
    <MainLayout backButton>
      <Toast />

      <Styled.SectionDetails>
        <Styled.BackgroundWrapper
          pokemonType={pokemon?.types[0].type.name || "unknown"}
        />

        <Styled.AvatarWrapper>
          {loading && !pokemon ? (
            <Styled.HeadWrap>
              <Skeleton variant="text" width={150} sx={{ bgcolor: "white" }} />
              <Skeleton variant="text" width={150} sx={{ bgcolor: "white" }} />
            </Styled.HeadWrap>
          ) : (
            <Styled.HeadWrap>
              <p className="pokemonName">{upperFirst(pokemon?.name || "")}</p>
              <p className="pokemonId">#{idPokemon(`${pokemon?.id}`)}</p>
            </Styled.HeadWrap>
          )}
          <Styled.OverlapWrap>
            {loading && !pokemon ? (
              <Styled.LoadingWrapper>
                <CircularProgress />
              </Styled.LoadingWrapper>
            ) : (
              <img
                className="pokemonAvatar"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                alt={pokemon?.name}
              />
            )}
          </Styled.OverlapWrap>
        </Styled.AvatarWrapper>

        <Styled.DescWrap>
          <Styled.FlexWrap>
            {pokemon?.types.map((val) => (
              <Styled.ChipPokemon pokemonType={val.type.name}>
                {val.type.name}
              </Styled.ChipPokemon>
            ))}
          </Styled.FlexWrap>

          <Styled.TabWrapper>
            <BasicTabs
              tabName={initialTab}
              value={tabValue}
              onChange={(_, val) => handleChange(val)}
              mainColors={pokemon?.types[0].type.name}
            >
              {initialTab.map((val, i) => (
                <TabPanel
                  index={i}
                  selected={tabValue === val.category}
                  key={i}
                >
                  {val.category === "stats" ? (
                    <React.Fragment>
                      {pokemon?.stats.map((val) => (
                        <StatsInfo
                          statName={val.stat.name}
                          value={val.base_stat}
                          type={pokemon.types[0].type.name}
                        />
                      ))}
                    </React.Fragment>
                  ) : (
                    <div className="aboutWrapper">
                      {!loading && species ? (
                        <InfoDivider
                          habitat={species?.habitat?.name || ""}
                          type={pokemon?.types[0].type.name || "unknown"}
                          weight={pokemon?.weight || 0}
                          height={pokemon?.height || 0}
                        />
                      ) : (
                        <>
                          <Skeleton
                            width={350}
                            height={50}
                            variant="rectangular"
                          />
                          <Skeleton width={350} height={50} variant="text" />
                          <Skeleton width={350} height={50} variant="text" />
                        </>
                      )}

                      <p className="flavour">
                        {species?.flavor_text_entries[0].flavor_text || ""}
                      </p>

                      <InfoWithLabel
                        type={pokemon?.types[0].type.name || "unknown"}
                        label="Egg Groups"
                      >
                        {species?.egg_groups.map((val, ix) => (
                          <p key={ix}>{val.name}</p>
                        ))}
                      </InfoWithLabel>
                      <InfoWithLabel
                        type={pokemon?.types[0].type.name || "unknown"}
                        label="Abilities"
                      >
                        {pokemon?.abilities.map((val, ix) => (
                          <p key={ix}>{val.ability.name}</p>
                        ))}
                      </InfoWithLabel>
                    </div>
                  )}
                </TabPanel>
              ))}
            </BasicTabs>
          </Styled.TabWrapper>
        </Styled.DescWrap>
      </Styled.SectionDetails>
    </MainLayout>
  );
};

export default Detail;
