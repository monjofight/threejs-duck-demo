import { Box, Heading, ListItem, UnorderedList, Link as ChakraLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const handleClick = (href: string) => router.push(href);

  return (
    <Box textAlign="center">
      <Heading as="h1" size="2xl" marginBottom="1rem">
        ページ一覧
      </Heading>
      <UnorderedList listStyleType="none">
        {['/duck', '/mofumofu', '/maru'].map((href, index) => (
          <ListItem key={index}>
            <ChakraLink href="#" onClick={() => handleClick(href)}>
              {titles[index]}
            </ChakraLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

const titles = ['ニワトリ', 'モフモフ', 'かわいいキャラ'];

export default Home;
