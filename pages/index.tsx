import { Box, VStack, Heading, ListItem, UnorderedList, Link as ChakraLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <VStack spacing={8} padding={5}>
        <Heading as="h1" size="2xl" marginBottom="1rem" color="teal.500">
          ページ一覧
        </Heading>
        <UnorderedList spacing={8} textAlign="left" marginLeft="auto" marginRight="auto" listStyleType="none">
          <ListItem>
            <ChakraLink href="#" onClick={() => handleClick('/duck')} padding="8px" borderRadius="md" backgroundColor="pink.200" _hover={{ textDecoration: 'none', backgroundColor: 'pink.300' }}>
              ニワトリ
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink href="#" onClick={() => handleClick('/mofumofu')} padding="8px" borderRadius="md" backgroundColor="purple.200" _hover={{ textDecoration: 'none', backgroundColor: 'purple.300' }}>
              モフモフ
            </ChakraLink>
          </ListItem>
        </UnorderedList>
      </VStack>
    </Box>
  );
};

export default Home;
