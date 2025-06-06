import { Box, Input, Image, Stack } from '@chakra-ui/react';
import SearchIcon from '@assets/search.svg';

import React from 'react';

type TSearch = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
// 1 = 4px
const Search = ({ searchTerm, setSearchTerm }: TSearch) => {
  return (
    <Box
      w="full"
      px={4}
      py={3}
      rounded="lg"
      mt={10}
      maxW="3xl"
      bg={'rgba(206, 206, 251,0.1)'}
    >
      <Stack direction={'row'} alignItems={'center'} pos={'relative'}>
        <Image
          src={SearchIcon}
          alt="Search Icon"
          pos={'absolute'}
          left={2}
          h={5}
          w={5}
        />
        <Input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          w={'full'}
          py={2}
          pl={10}
          pr={{ base: undefined, sm: 10 }}
          fontSize="base"
          color="gray.200"
          _placeholder={{ color: 'gray.400' }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
        />
      </Stack>
    </Box>
  );
};

export default Search;
