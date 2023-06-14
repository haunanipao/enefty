
import { Footer, Header, NFTCard } from "@/components";
import { contractAddress } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "@/icons/SearchIcon";
import {
  MediaRenderer, NFT, useContract, useMetadata, useNFT, useNFTs,useTotalCount,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { EditIcon, ViewIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex,
  FormControl,
  FormLabel,
  FormHelperText, Heading, HStack, Image,   Input,
  InputGroup,
  InputLeftElement, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";
  import { Form, redirect } from 'react-router-dom'

function App() {
  const nftsPerPage = 30;
  const { contract } = useContract(contractAddress);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const { data: nfts, isLoading } = useNFTs(contract, {
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
  });
  const { data: totalCount } = useTotalCount(contract);
  const { data: firstNFT, isLoading: nftLoading } = useNFT(contract, 0);
  const { data: contractMetadata, isLoading: contractLoading } = useMetadata(contract);
  const [nft, setNft] = useState<NFT | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchNFT = async () => {
    const nft = await contract?.erc721.get(debouncedSearchTerm);
    setNft(nft!);
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchNFT();
    } else {
      setNft(null);
    }
  }, [debouncedSearchTerm]);

  console.log(firstNFT);
  return (
    <Container maxW="1920px" bg="brand.300" p={10}> 
      <Header />
      <Flex
      direction="column"
      w={'auto'}
      bg="brand.100"
      justifyContent={'center'}
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      m={10}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
        mb={10}
      >
        Collections{' '}
        <Text as={'span'} color={'brand.700'}>
          made easy
        </Text>
      </Heading>
      <Form method="post" action="/create">
        <FormControl mb="40px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
            <Search2Icon color="brand.600" />
            </InputLeftElement>
            <Input
              w={'500px'}
              type="text"
              name="collection address"
              size="lg"
              bg="white.50"
              color="brand.700"
              borderColor="brand.900"
              placeholder="What's the collection address?"
              _placeholder={{ color: 'inherit' }}
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" colorScheme="brand">
          Find The NFTs
        </Button>
      </Form>
    </Flex>
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>

      <Flex h={"100vh"} p={10} direction="column" alignItems={"center"} justifyContent={"top"} bg="brand.100" >
        
        <Card direction="row" w="1000px">
        <CardHeader w="300px">
          <Skeleton isLoaded={!nftLoading}>
            <Image src={contractMetadata?.image} alt={contractMetadata?.name} borderRadius="20px"/>
          </Skeleton>
        </CardHeader>
        <CardBody w="700px">
          <Flex direction="column" gap={10}>
            <Skeleton isLoaded={!nftLoading}>
              <Heading>{contractMetadata?.name}</Heading>
            </Skeleton>
            <Skeleton isLoaded={!nftLoading}>
              <Text>{contractMetadata?.description}</Text>
            </Skeleton>
            <Text>Total Minted in Collection: minted / Total Supply </Text>
          </Flex>
        </CardBody>
        <CardFooter>
          <Flex>
            <Button leftIcon={<ViewIcon />} colorScheme="brand" variant="solid" />
          </Flex>
        </CardFooter>
        </Card>
        <Flex m={10}>
          {nfts && !search && (
            <Flex direction="row" wrap="wrap" justify="top" align="top" gap={10}>
              {nfts.map((nft) => (<NFTCard nft={nft} key={nft.metadata.id} />))}
            </Flex>
          )}
        </Flex>
      </Flex>
      <Footer />

    </Container>
  );
}

export default App;
