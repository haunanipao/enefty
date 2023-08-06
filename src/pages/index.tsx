import { Footer, Header, AddContract, ContractList, NFTCollection, NFTCard, Pagination } from "@/components";
// import { contractAddress } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
import { truncateAddress } from "@/utils/truncateAddress";
import { Form, Link, redirect } from "react-router-dom";
import { MediaRenderer, NFT, useContract, useContractRead, useMetadata, useNFT, useNFTs, useTotalCount} from "@thirdweb-dev/react";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { EditIcon, ViewIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, FormControl, FormLabel, FormHelperText, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Select, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";

export default function App() {
   // State variable to store the selected contract address
   const [selectedContract, setSelectedContract] = useState<string>("0xe8212Fa06dcB4E0364676dEaFf3bf5A742059d26"); // Set the initial selected contract address here
  
  // Collection Information
  const { contract: selectedContractData } = useContract(selectedContract); // interact with the selected smart contract
  const { data: contractMetadata, isLoading: contractLoading } = useMetadata(selectedContractData); // get collection metadata eg image and description
  const { data: totalCount } = useTotalCount(selectedContractData); // how many nft in collection
  const { data: lastNFT, isLoading: nftLoading } = useNFT(selectedContractData, totalCount-1); // get last nft in collection if there is no image in collection metadata
  
  //state variable to feed into the contract that feeds into the debounce search term
  // const [contractAddress, setContractAddress] = useState<string>(contract);

  const handleContractSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedContract(event.target.value);
    };
    
  const handleContractClick = async () => {
    try {
      const contract = await useContract(selectedContract);
      setSelectedContractData(contract);
      setPage(1); // Reset the page to 1 when a new contract is selected
      } catch (error) {
      console.error("Error fetching contract data:", error);
      // Handle the error if the contract data cannot be fetched
      }
    };

  useEffect(() => {handleContractClick();}, []); // Fetch the NFT data when the component mounts
    
  // NFT layout and Search Information  
  const nftsPerPage = 30;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);  // reset this term with the selected contract address
 
  const { data: nfts, isLoading } = useNFTs(selectedContractData, {
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
    contractAddress: selectedContract,
  }); // get nfts in collection

// React Hooks
  const [nft, setNft] = useState<NFT | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const fetchNFT = async () => {
    const nft = await selectedContractData?.erc721.get(debouncedSearchTerm || selectedContract);  // the debouncedSearchTerm gets reset with the selected contract address
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
  }, [debouncedSearchTerm, selectedContract]);

   // Contract List
   const [contracts, setContracts] = useState([
    { address: "0xe8212Fa06dcB4E0364676dEaFf3bf5A742059d26", chain: "mumbai", contractName: "Enefty" },
    { address: "0x13BD972B0bfaefC9538a43c1FDA11D71C720cD47", chain: "ethereum", contractName: "BoxcatPlanet" },
    { address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544", chain: "ethereum", contractName: "Azuri" },
  ]);

  // To do: Add pagination, add search,
  return (
    <Container maxW="1920px" bg="brand.600" p={10}> 
      <Header />
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>

      <Flex direction="column" bg="brand.100" p={10}>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mb={4}>
        Choose a Collection to view its NFTs.
        </Text>
        <Stack spacing={2} alignItems="center">     
          <FormControl colorScheme="brand">
            <FormLabel></FormLabel>
              <Select
                placeholder="Select a Collection"
                value={selectedContract}
                onChange={handleContractSelect}
                colorScheme="brand"
              >
              {contracts.map((contract, index) => (
                <option key={index} value={contract.address}>
                  {contract.contractName}: {contract.address} on {contract.chain}
                </option>
              ))}
              </Select>
              {selectedContractData && (
                <Stack m={5}>
                  <Text>Selected Contract: {selectedContractData.contractName}</Text>
                  <Button onClick={handleContractClick} colorScheme="brand">
                      Fetch {selectedContractData.contractName} NFTs
                    </Button>
                </Stack>
              )}
          </FormControl>
        </Stack>
      </Flex>

      <Flex p={10} direction="column" alignItems={"center"} justifyContent={"top"} bg="brand.100">  
      
      {/* <ContractList fetchNFT={fetchNFT} contracts={contracts} /> */}
        <Skeleton maxW="100%" isLoaded={!contractLoading}>
          <NFTCollection
            contractMetadata={contractMetadata}
            contractAddress={selectedContract}
            lastNFT={lastNFT}
            totalCount={totalCount}
          />
        </Skeleton>

        {/* Search for a NFT by ID */}
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

        {/* This interacts with input field to search for a specific NFT */}
        {isSearching ? (<Text>Aloha e Ka Honua / Hello World!</Text>) : null}

        {search && nft && !isSearching ? (
          <NFTCard nft={nft} key={nft.metadata.id} />) : null}

        {isLoading && (
          <Flex>{Array.from({ length: nftsPerPage }).map((_, i) => (<div />))}
          </Flex>
        )}
      
      </Flex>
      <Footer />
    </Container>
  );
};