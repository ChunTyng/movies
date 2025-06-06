import { type TMovie } from '@/type/type.ts';
import { Box, Image, Stack, Text } from '@chakra-ui/react';
import star from '@assets/star.svg';
import noMovie from '@assets/no-movie.png';

type TMovieCard = {
  movie: TMovie;
};
const MovieCard = ({
  movie: { poster_path, title, vote_average, original_language, release_date },
}: TMovieCard) => {
  return (
    <Box
      as="li"
      bg="dark.100"
      p={2}
      rounded={'lg'}
      boxShadow="inset 0 2px 4px rgba(2, 26, 246, 0.5)"
    >
      <Image
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : noMovie
        }
        w={'full'}
        h={'auto'}
        rounded={'lg'}
      />
      <Stack mt={4} gap={0}>
        {/* title */}
        <Text fontWeight="bold" fontFamily="sans-serif">
          {title}
        </Text>

        <Stack direction="row" mt={2} alignItems={'center'}>
          {/* rating */}
          <Stack direction="row" gap={1}>
            <Image src={star} w={'auto'} height={'auto'} mb="4px" />
            <Text fontSize="sm" fontWeight={'bold'}>
              {vote_average ? vote_average.toFixed(1) : 'N/A'}
            </Text>
          </Stack>

          {/* language */}
          <Stack direction="row" color={'gray.400'} gap={2}>
            <Text mt={'1px'}>•</Text>
            <Text>
              {original_language.charAt(0).toUpperCase() +
                original_language.slice(1)}
            </Text>
          </Stack>

          <Stack direction="row" color={'gray.400'} gap={2}>
            <Text mt={'1px'}>•</Text>
            <Text>{release_date ? release_date.split('-', 1) : 'N/A'}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MovieCard;
