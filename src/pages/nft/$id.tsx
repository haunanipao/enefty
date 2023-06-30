import { Header, Footer, NFTCard, NavNFT } from "@/components";
import { HistoryCard } from "@/components/HistoryCard";
import { contractAddress } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import { ThirdwebNftMedia, useContract, useContractEvents, useContractMetadata, useNFT, useTotalCount} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Badge, Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, FormControl, FormLabel, FormHelperText, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Link, Skeleton, Spacer, Stack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text, VStack } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons"

//To do: add way to view a bigger picture of nft
const NFTPage = () => {
  const { id } = useParams();
  const { contract } = useContract(contractAddress);
  const { data: totalCount } = useTotalCount(contract); // how many nft in collection
  const { data: nft, isLoading } = useNFT(contract, Number(id));
  const { data: contractMetadata } = useContractMetadata(contract);
  const { data: eventsData, isLoading: eventsLoading } = useContractEvents(
    contract,
    "Transfer",
    {
      queryFilter: {
        filters: {
          tokenId: Number(id!),
        },
        order: "desc",
      },
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextId = Number(id) + 1;
  const prevId = Number(id) - 1;
  const totalNFTs = totalCount?.toNumber();

  return (
    <Container maxW="1920px" bg="brand.200" p={10}>
      <Header />

      <Helmet>
        <title>{nft?.metadata.name}</title>
      </Helmet>

      <Box>
        <Skeleton isLoaded={!isLoading}>
          {/* <NavNFT    
          id={id}
          prevId={prevId}
          nextId={nextId}
          totalNFTs={totalNFTs}
          contractMetadata={contractMetadata}
          /> */}
        <Card direction="row" bg="brand.100" w="100%" >
          <CardHeader>
            {nft ? (
            <ThirdwebNftMedia
              metadata={nft?.metadata}
              mimeType={nft?.mimeType}
              w="100%"
            />
            ) : (isLoading && (<div />))}
          </CardHeader>
{/* NFT Information */}
          <CardBody w="100%">
            <Flex direction="row" gap={10}>
              <Flex direction="column" gap={5} w="50%">
                <Stack>     
                  {contractMetadata?.name ? (
                    <Text textTransform="uppercase">Collection Name</Text>
                  ) : (isLoading && (<div />))}
                  {isLoading ? (
                    <div />
                  ) : (
                    <Heading fontSize="2xl">{contractMetadata?.name} #{id}</Heading>
                  )}
                </Stack>
                <Stack>
                  {nft?.metadata.name ? (
                    <Text textTransform="uppercase">NFT Name</Text>
                  ) : (isLoading && (<div />))}
                    {isLoading ? (
                      <div />
                  ) : (
                      <Heading fontSize="2xl">{nft?.metadata.name}</Heading>
                  )}
                </Stack>
                <Stack>
                  {nft?.metadata.name ? (
                    <Text textTransform="uppercase">NFT / Total</Text>
                  ) : (isLoading && (<div />))}
                    {isLoading ? (
                      <div />
                  ) : (
                      <Heading fontSize="2xl">{Number(id) + 1} / {totalNFTs} NFTs</Heading>
                  )}
                </Stack>
                <Stack>
                  {nft?.metadata.name ? (
                    <Text textTransform="uppercase">Description</Text>
                  ) : (isLoading && (<div />))}
                    {isLoading ? (
                      <div />
                  ) : (
                    <Heading fontSize="2xl">{String(nft.metadata.description).split("#")[0]}</Heading>
                  )}
              </Stack>
              <Stack>
                {nft?.owner ? (
                  <Text textTransform="uppercase">Current Owner</Text>
                ) : (isLoading && (<div />))}

                {isLoading ? (<div />) : (
                  <Heading fontSize="2xl" textTransform="uppercase">{truncateAddress(nft?.owner!)}</Heading>
                )}
              </Stack>
            </Flex>
            
{/* Attributes */}
              <Flex direction="column" w="50%">
                {nft?.metadata.attributes &&
                  // @ts-ignore
                  nft?.metadata.attributes.length > 0 && (
                    <Stack mb={5}>
                      {isLoading ? (
                        <div />
                      ) : (<Text textTransform="uppercase">Attributes</Text>)}         
                        <Flex direction="row" wrap="wrap" justify="top" gap={5}>
                          {nft?.metadata.attributes?.map(
                          (attr: { trait_type: string; value: string }) => (
                            <VStack p={5} border="1px" bg="brand.50" borderRadius="10px" borderColor="brand.600" alignItems="left">
                              <Text textTransform="uppercase">{attr.trait_type}</Text>
                              <Heading fontSize="2xl" color="brand.600">{attr.value}</Heading>
                            </VStack>
                          ),
                        )}
                        </Flex>
                    </Stack>
                  )}  
              </Flex>
            </Flex>
{/* Transaction History */}
            <Flex direction="column" mt={10}>     
              {eventsData && eventsData?.length > 0 ? (
                <Text textTransform="uppercase">Transaction History</Text>
              ) : (isLoading && (<div />))}
              {eventsLoading ? (<div />) : (
                <Flex direction="column">
                  <TableContainer>
                    <Table variant='striped' colorScheme='brand.200'>
                      <Thead>
                        <Tr>
                          <Th w="25%">Event Type</Th>
                          <Th w="25%">From </Th>
                          <Th w="25%">To </Th>
                          <Th w="25%">Details</Th>
                        </Tr>
                      </Thead>
                    </Table>
                  </TableContainer>  
                  {eventsData?.map((event) => (<HistoryCard event={event} />))}
                </Flex>
            )}</Flex>
          </CardBody>
          <CardFooter w="5%"></CardFooter>
        </Card>
       
        <Flex p={10} gap={10} bg="brand.50" justifyContent="space-around" alignItems="center">
          <HStack>
          {id > 0 && (
            <Link href={`/nft/${prevId}`}>
              <Button leftIcon={<ArrowBackIcon />}  colorScheme="brand">
              {contractMetadata?.name} {prevId}
              </Button>
            </Link>
          )}
          <Link href="/">
            <Button rightIcon={<ArrowUpIcon/>} variant="outline" colorScheme="brand">Collection Home</Button>
          </Link>
          {totalNFTs > nextId && (
            <Link href={`/nft/${nextId}`}>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme="brand">
              {contractMetadata?.name} {nextId}
              </Button>
            </Link>
          )}
          </HStack>
        </Flex>

        </Skeleton>
      </Box>
      <Footer />
    </Container>
  );
};

export default NFTPage;
