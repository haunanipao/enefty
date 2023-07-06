import { Footer, Header, AddContract, ContractList, NFTCollection, NFTCard, Pagination } from "@/components";
import { contractAddress } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
import { truncateAddress } from "@/utils/truncateAddress";
import { Form, Link, redirect } from "react-router-dom";
import { MediaRenderer, NFT, useContract, useContractRead, useMetadata, useNFT, useNFTs, useTotalCount} from "@thirdweb-dev/react";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { EditIcon, ViewIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, FormControl, FormLabel, FormHelperText, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";

export default function App() {
// Collection Information
  const { contract } = useContract(contractAddress); // interact with smart contract
  const { data: contractMetadata, isLoading: contractLoading } = useMetadata(contract); // get collection metadata eg image and description
  const { data: totalCount } = useTotalCount(contract); // how many nft in collection
  const { data: lastNFT, isLoading: nftLoading } = useNFT(contract, totalCount-1); // get last nft in collection if there is no image in collection metadata

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
  console.log("name:", contractMetadata?.name)
  console.log("contract Address:", contractAddress)
  console.log("last NFT:", lastNFT)
  console.log("total Count:",  totalCount)
  // To do: Add pagination, add search,
  return (
    <Container maxW="1920px" bg="brand.600" p={10}> 
      <Header />
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>
      <Flex p={10} direction="column" alignItems={"center"} justifyContent={"top"} bg="brand.100">  
      <ContractList fetchNFT={fetchNFT}/>
       <Skeleton maxW="100%" isLoaded={!contractLoading}>
        <NFTCollection
            contractMetadata={contractMetadata}
            contractAddress={contractAddress}
            lastNFT={lastNFT}
            totalCount={totalCount}
          />
        </Skeleton>
        <InputGroup w="25%" m={10} alignItems="center">
          <InputLeftElement pointerEvents="none" children={<Search2Icon />}  alignItems="center"/>
            <Input type="text" name="NFT ID" size="lg"
              bg="white.50" color="brand.700" colorScheme="brand" borderColor="brand.900" 
              placeholder="Give me a NFT number!" 
              _placeholder={{ color: 'inherit' }}
              onChange={(e) => {
                  if (e.target.value.match(/^[0-9]*$/) && Number(e.target.value) > 0) 
                    {
                    setSearch(e.target.value);
                    } else {setSearch("");
                  }
                }}
                value={search}
            />
        </InputGroup>
       {/* This is the matching NFTs with pagination    */}
        {!search && (
          <Pagination
            page={page}
            setPage={setPage}
            nftsPerPage={nftsPerPage}
            totalCount={totalCount}
            loading={isLoading}
          />
        )}
        <Flex m={10}>
          <Skeleton isLoaded={!contractLoading}>
          {nfts && !search && (
            <Flex direction="row" wrap="wrap" justify="top" align="top" gap={10}>
              {nfts.map((nft) => (<NFTCard nft={nft} key={nft.metadata.id} />))}
            </Flex>
          )}
          </Skeleton>
        </Flex>
        {!search && (
          <Pagination
            page={page}
            setPage={setPage}
            nftsPerPage={nftsPerPage}
            totalCount={totalCount}
            loading={isLoading}
          />
        )}
        {/* End of NFT and Pagination */}
      </Flex>
      <Footer />
    </Container>
  );
};