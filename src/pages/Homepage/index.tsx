import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import { MainLayout } from "../../components/main-layout";
import useToast from "../../components/toast";
import http from "../../utils/http";
import Styled, { CardPokemon, SkeletonCard } from "./style";

interface IPokemon {
  count: number;
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

const Homepage: React.FC = () => {
  const history = useHistory();
  const [Toast, setToast] = useToast();
  const [loading, setLoading] = React.useState(false);
  const [pokemons, setPokemons] = React.useState<IPokemon>({
    count: 1,
    next: "",
    results: [],
  });

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await http.get<IPokemon>(`/pokemon`);

        setPokemons(data);
      } catch (error) {
        setToast({ message: "Error get data" });
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = async () => {
    try {
      const { data } = await http.get<IPokemon>(
        pokemons?.next.split("v2/")[1] || "/pokemon"
      );

      setPokemons({
        ...data,
        results: pokemons ? [...pokemons?.results, ...data.results] : [],
      });
    } catch (error) {
      setToast({ message: "Error get data" });
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const upperFirst = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const idPokemon = (word: string) => {
    let id = word.slice(0, -1).split("/").pop() || "";

    if (id?.length > 3) {
      return id || "-";
    }

    return ("00" + word.slice(0, -1).split("/").pop())?.slice(-3) || "-";
  };

  const idRaw = (word: string) => {
    let id = word.slice(0, -1).split("/").pop() || "";

    return id || "-";
  };

  return (
    <MainLayout>
      <Toast />
      <Styled.SectionList>
        <div className="listTitle">
          <p>List Pokemon</p>
        </div>

        <InfiniteScroll
          dataLength={pokemons?.results.length * 20}
          // scrollableTarget="listWrapper"
          pullDownToRefreshThreshold={100}
          next={loadMore}
          hasMore={pokemons.results.length < pokemons.count}
          loader={
            <div className="listWrapper">
              {[...Array(2)].map((_, ix) => (
                <SkeletonCard key={ix} />
              ))}
            </div>
          }
        >
          <div className="listWrapper">
            {loading
              ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              : pokemons?.results.map((val, i) => (
                  <CardPokemon
                    id={idPokemon(val.url)}
                    idRaw={idRaw(val.url)}
                    name={upperFirst(val.name)}
                    key={i}
                    onClick={() => history.push(`/pokemon/${val.name}`)}
                  />
                ))}
          </div>
        </InfiniteScroll>
      </Styled.SectionList>
    </MainLayout>
  );
};

export default Homepage;
