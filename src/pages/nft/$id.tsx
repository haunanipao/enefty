import { Header, Footer, NFTCard } from "@/components";
import { HistoryCard } from "@/components/HistoryCard";
import { PoweredBy } from "@/components/PoweredBy";
import { contractAddress } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import { ThirdwebNftMedia, useContract, useContractEvents, useContractMetadata,
  useNFT,} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Badge, Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, FormControl, FormLabel, FormHelperText, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Skeleton, Spacer, Stack, Text, VStack } from "@chakra-ui/react";

const NFTPage = () => {
  const { id } = useParams();
  const { contract } = useContract(contractAddress);
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

  return (
    <Container maxW="1920px" bg="brand.300" p={10}>
      <Header />

      <Helmet>
        <title>{nft?.metadata.name}</title>
      </Helmet>

      <Box >
        <Card direction="row" bg="brand.100">
          <CardHeader direction="row">
            {nft ? (
            <ThirdwebNftMedia
              metadata={nft?.metadata}
              mimeType={nft?.mimeType}
            />
            ) : (isLoading && (<div />))}
            
          </CardHeader>
          <CardBody direction="row">
            <Heading>{nft?.metadata.name}</Heading>
              <div>
                {contractMetadata?.name ? (
                  <div />
                ) : (isLoading && (<div />))}
                {isLoading ? (
                  <div />
                ) : (
                  <Heading>{contractMetadata?.name}</Heading>
                )}
              </div>
          <Flex direction="column">
            <Text textTransform="uppercase">#{id}</Text>

            {nft?.metadata.name ? (
              <Heading>{String(nft?.metadata.name).split("#")[0]}</Heading>
            ) : (
              isLoading && (<div />)
            )}
          </Flex>

          <Flex direction="column">
            {nft?.owner ? (
              <Text textTransform="uppercase">Current Owner</Text>
            ) : (isLoading && (<div />))}

            {isLoading ? (<div />) : (
              <Heading fontSize="2xl" textTransform="uppercase">{truncateAddress(nft?.owner!)}</Heading>
            )}
          </Flex>

{/* Attributes */}
          <Flex direction="column" gap={4} mt={4}>
            {nft?.metadata.attributes &&
              // @ts-ignore
              nft?.metadata.attributes.length > 0 && (
                <Stack mb={5}>
                  {isLoading ? (
                    <div />
                  ) : (<Heading textTransform="uppercase">Attributes</Heading>)}         
                    <Flex direction="row" wrap="wrap" justify="top" gap={5}>
                      {nft?.metadata.attributes?.map(
                      (attr: { trait_type: string; value: string }) => (
                        <VStack p={5} border="1px" borderRadius="10px" borderColor="brand.600" alignItems="left">
                          <Text textTransform="uppercase">{attr.trait_type}</Text>
                          <Heading fontSize="2xl" color="brand.600">{attr.value}</Heading>
                        </VStack>
                      ),
                    )}
                    </Flex>
                </Stack>
              )}  
          </Flex>
          </CardBody>
          <CardFooter>          
            {eventsData && eventsData?.length > 0 ? (
              <Heading textTransform="uppercase">Transaction History</Heading>
            ) : (isLoading && (<div />))}
            {eventsLoading ? (<div />) : (
              <Flex direction="row" wrap="wrap" gap={5}>
                {eventsData?.map((event) => (<HistoryCard event={event} />))}
              </Flex>
            )}</CardFooter>
        </Card>
      </Box>
      <Footer />
    </Container>
  );
};

export default NFTPage;
