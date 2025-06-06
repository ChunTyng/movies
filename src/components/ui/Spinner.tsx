import { ProgressCircle } from '@chakra-ui/react';

const Spinner = () => {
  return (
    <>
      <ProgressCircle.Root
        value={null}
        colorPalette={'blue'}
        my={5}
        display={'flex'}
        justifyContent={'center'}
        direction={'row'}
        alignItems={'center'}
      >
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range strokeLinecap="round" stroke="blue.200" />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </>
  );
};

export default Spinner;
