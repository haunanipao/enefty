
import { Footer, Header, NFTCard, Collection, Pagination } from "@/components";
import { contractAddress } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
import { truncateAddress } from "@/utils/truncateAddress";
import { SearchIcon } from "@/icons/SearchIcon";
import { MediaRenderer, NFT, useContract,  useContractRead, useMetadata, useNFT, useNFTs,useTotalCount} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { EditIcon, ViewIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, FormControl, FormLabel, FormHelperText, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";

export default function App() {
// Collection Information
  const { contract } = useContract(contractAddress); // interact with smart contract
  const { data: contractMetadata, isLoading: contractLoading } = useMetadata(contract); // get collection metadata eg image and description
  const { data: totalCount } = useTotalCount(contract); // how many nft in collection
  const { data: totalMinted } = useContractRead(contract,"totalMinted"); // how many nft minted

  // NFT layout and Search Information  
  const nftsPerPage = 30;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const { data: nfts, isLoading } = useNFTs(contract, {
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
  }); // get nfts in collection

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

  return (
    <Container maxW="1920px" bg="brand.300" p={10}> 
      <Header />
  
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>

      <Flex p={10} direction="column" alignItems={"center"} justifyContent={"top"} bg="brand.100">   
       {/* <Collection collection ={contractAddress} />  */}
       <Skeleton maxW="95%" isLoaded={!contractLoading}>
        <Card direction="row">
          <CardHeader w="25%">
            <Image src={contractMetadata?.image} alt={contractMetadata?.name} />
          </CardHeader>
          <CardBody w="50%">
            <Flex direction="column" gap={10}>
              <Heading
                bgGradient="linear(to-l, #DC0092, #8108B7)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >{contractMetadata?.name}</Heading>
              <Text fontSize="2xl">{contractMetadata?.description}</Text>
            </Flex>
          </CardBody>
          <CardFooter w="25%">
            <Flex justifyContent={"top"} direction="column" gap={5} borderColor="brand.700" fontSize="2xl" wrap="wrap">
              <Text fontWeight="bold">Collection Address </Text>
              <Text>{truncateAddress(contractAddress)} </Text>
              <HStack>
                <Text fontWeight="bold">Symbol</Text>          
                <Text>{contractMetadata?.symbol}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="brand.600" fontSize="48px" alignItems={"top"}>{totalCount?.toNumber()}</Text>
                <Text>NFTs in Collection</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="brand.600" fontSize="48px">{totalMinted?.toNumber()}</Text> 
                <Text>NFTs Minted from Collection</Text>
              </HStack>  
            </Flex>
          </CardFooter>
        </Card>
        </Skeleton>
        <Flex m={10}>
          <Skeleton isLoaded={!contractLoading}>
          {nfts && !search && (
            <Flex direction="row" wrap="wrap" justify="top" align="top" gap={10}>
              {nfts.map((nft) => (<NFTCard nft={nft} key={nft.metadata.id} />))}
            </Flex>
          )}
          </Skeleton>
        </Flex>
      </Flex>
      {/* <Box>
          <SearchIcon />
          <input type="text"
            onChange={(e) => {
              if (
                e.target.value.match(/^[0-9]*$/) &&
                Number(e.target.value) > 0
              ) {
                setSearch(e.target.value);
              } else {
                setSearch("");
              }
            }}
            placeholder="Search by ID"
          />
        </Box> */}

        {isSearching ? (<Text>Hello World!</Text>) : null}

        {search && nft && !isSearching ? (
          <NFTCard nft={nft} key={nft.metadata.id} />
        ) : null}

        {isLoading && (
          <Flex>
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div />
            ))}
          </Flex>
        )}
      
        {!search && (
          <Pagination
            page={page}
            setPage={setPage}
            nftsPerPage={nftsPerPage}
            totalCount={totalCount}
            loading={isLoading}
          />
        )}
      <Footer />

    </Container>
  );
};