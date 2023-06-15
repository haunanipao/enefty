
import { Footer, Header, NFTCard } from "@/components";
import { contractAddress } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "@/icons/SearchIcon";
import { MediaRenderer, NFT, useContract,  useContractRead, useMetadata, useNFT, useNFTs,useTotalCount} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { EditIcon, ViewIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex,
  FormControl, FormLabel, FormHelperText, Heading, HStack, Image, Input, InputGroup,
  InputLeftElement, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";
  import { Form, redirect } from 'react-router-dom'

function App() {
// Collection Information
  const { contract } = useContract(contractAddress); // interact with smart contract
  const { data: contractMetadata, isLoading: contractLoading } = useMetadata(contract); // get collection metadata eg image and description
  const { data: totalCount } = useTotalCount(contract); // how many nft in collection
  const { data: totalMinted } = useContractRead(contract,"totalMinted"); // how many nft minted
  const { data: firstNFT, isLoading: nftLoading } = useNFT(contract, 0); // get first nft in collection
// NFT layout and Search Information  
  const nftsPerPage = 30;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const { data: nfts, isLoading } = useNFTs(contract, {
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
  });


// React Hooks
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

  console.log(totalCount?.toNumber());
  return (
    <Container maxW="1920px" bg="brand.300" p={10}> 
      <Header />
  
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>

      <Flex p={10} direction="column" alignItems={"center"} justifyContent={"top"} bg="brand.100">
        
        <Card direction="row">
        <CardHeader w="25%">
          <Skeleton isLoaded={!contractLoading}>
            <Image src={contractMetadata?.image} alt={contractMetadata?.name} borderRadius="20px"/>
          </Skeleton>
        </CardHeader>
        <CardBody w="50%">
          <Flex direction="column" gap={10}>
          <Skeleton isLoaded={!contractLoading}>
            <Heading
              bgGradient="linear(to-l, #DC0092, #8108B7)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >{contractMetadata?.name}</Heading>
            </Skeleton>
            <Skeleton isLoaded={!contractLoading}>
              <Text fontSize="2xl">{contractMetadata?.description}</Text>
            </Skeleton>
          </Flex>
        </CardBody>
        <CardFooter w="25%">
          <Flex direction="column" gap={10} borderColor="brand.700" borderRadius="20px" fontSize="1xl" wrap="wrap">
          <Skeleton isLoaded={!contractLoading}>
              <Button leftIcon={<ViewIcon />} colorScheme="brand" variant="solid" />
              <Text>Collection Address: {contractAddress} </Text>
              <Text>Fee Recipient: {contractMetadata?.fee_recipient}</Text>          
              <Text>Symbol: {contractMetadata?.symbol}</Text>
              <Text>{totalCount?.toNumber()} NFTs in Collection  </Text>
              <Text>{totalMinted?.toNumber()} NFTs Minted from Collection </Text>
            </Skeleton>
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
