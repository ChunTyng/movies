import '@App.css';
import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import hero from '@assets/hero.png';
import heroBg from '@assets/hero-bg.png';
import Search from '@components/ui/Search';
import Spinner from '@components/ui/Spinner';
import MovieCard from '@components/ui/MovieCard';
import { useState, useEffect } from 'react';
import { type TMovie } from '@/type/type.ts';
import { useDebounce } from 'react-use';
import { Separator } from '@chakra-ui/react';

//#region API
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};
// #endregion;

const App = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [movieList, setMovieList] = useState<TMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [highRatedMovies, setHighRatedMovies] = useState<TMovie[]>([]);

  // delay search
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  console.log('this is movieList' + JSON.stringify(movieList[0], null, 2));

  // fetch high rated movies
  const fetchHighRatedMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=vote_average.desc&include_adult=false&vote_count.gte=100&vote_average.gte=8&certification_country=US&certification.lte=PG-13`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch high-rated movies');
      }
      const data = await response.json();
      setHighRatedMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching high-rated movies:', error);
    }
  };

  // fetch movies (page 1 only)
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?&include_video=false&sort_by=popularity.desc&include_adult=false&vote_count.gte=100&certification_country=US&certification.lte=PG-13`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      console.log(data);

      setMovieList(data.results || []);
    } catch (error) {
      console.log(`$Error fetching data:${error}`);
      setErrorMessage('Error fetching movies,Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHighRatedMovies();
  }, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Box
      as={'main'}
      bgImage={`url(${heroBg})`}
      bgAttachment="fixed"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPos="top center"
      minH="100dvh"
    >
      <Container
        px={5}
        maxW="7xl"
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems={'center'}
        position="relative"
        zIndex={10}
      >
        <Stack as={'header'} gap={10} mt={'100px'}>
          <Image
            src={hero}
            alt="Hero Banner"
            w={'full'}
            maxW={'lg'}
            h={'auto'}
            mx={'auto'}
            filter="drop-shadow(2px 2px 10px rgba(182, 182, 182, 0.3))"
          />
          <Heading as={'h1'} textAlign={'center'} fontSize={'3xl'}>
            Find
            <Box
              as={'span'}
              bgGradient={'to-r'}
              gradientFrom={'#D6C7FF'}
              gradientTo={'#AB8BFF'}
              bgClip={'text'}
              fontWeight={800}
            >
              {' '}
              Movies{' '}
            </Box>
            You'll Enjoy Without the Hassle
          </Heading>
        </Stack>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Container>

      {/* High-rated movies  */}
      <Box as={'section'} mx={10}>
        <Heading
          my={5}
          color="yellow.300"
          textShadow="0px 2px 20px rgba(255, 255, 255, 0.9)"
          display="inline-block"
        >
          High-rated Movies 👍
        </Heading>
        <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'}>
          {highRatedMovies.slice(0, 10).map((movie) => (
            <Text
              bg={'rgba(255,255,255,0.1)'}
              rounded={'xl'}
              px={'20px'}
              py={'10px'}
              fontSize={'13px'}
            >
              {movie.title}
            </Text>
          ))}
        </Stack>
      </Box>

      <Separator
        borderColor="blue.400"
        borderWidth="1px"
        my={4}
        boxShadow="0px 5px 20px 10px rgba(4, 22, 110, 0.3)"
      />

      {/* all-movies */}
      <Box as={'section'} mx={10}>
        <Heading my={5}>All Movies</Heading>
        {isLoading ? (
          // Loader
          <Spinner />
        ) : errorMessage ? (
          <Text color={'red.500'}>{errorMessage}</Text>
        ) : (
          <SimpleGrid
            as="ul"
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            gap={5}
            pb={5}
          >
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default App;
