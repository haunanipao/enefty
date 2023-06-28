import { Header, Footer } from "@/components";
import { HistoryCard } from "@/components/HistoryCard";
import { PoweredBy } from "@/components/PoweredBy";
import { contractAddress } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import { ThirdwebNftMedia, useContract, useContractEvents, useContractMetadata,
  useNFT,} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, FormControl, FormLabel, FormHelperText, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";

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

      <div>
        <div>
          {nft ? (<ThirdwebNftMedia metadata={nft?.metadata} mimeType={nft?.mimeType} />
          ) : (isLoading && (<div />))}

          {eventsData && eventsData?.length > 0 ? (<p> History </p>) : (isLoading && (<div />))}

          {eventsLoading ? (<div/>) : (<div> {eventsData?.map((event) => (<HistoryCard event {event} />))}</div>)}
        </div>

        <div>
          <div>
            {contractMetadata?.name ? (<p> hello </p>) : (isLoading && (<div />))}

            {isLoading ? (<div />) : (<p>{contractMetadata?.name}</p>)}
          </div>

          <div>
            <p>#{id}</p>

            {nft?.metadata.name ? (
              <p>
                {String(nft?.metadata.name).split("#")[0]}
              </p>
            ) : (
              isLoading && (
                <div />
              )
            )}
          </div>

          <div >
            {nft?.owner ? (
              <p>
                CURRENT OWNER
              </p>
            ) : (
              isLoading && (
                <div />
              )
            )}

            {isLoading ? (
              <div />
            ) : (
              <p>
                {truncateAddress(nft?.owner!)}
              </p>
            )}
          </div>

          {nft?.metadata.description ? (<p>Description</p>) : (isLoading && (<div />))}

          {isLoading ? (<div />) : (<p>{nft?.metadata.description}</p>)}

          <div>
            {nft?.metadata.attributes &&
              // @ts-ignore
              nft?.metadata.attributes.length > 0 && (
                <>
                  {isLoading ? (
                    <div />
                  ) : (
                    <p>
                      Attributes
                    </p>
                  )}
                  <div>
                    {/* @ts-ignore */}
                    {nft?.metadata.attributes?.map(
                      (attr: { trait_type: string; value: string }) => (
                        <div>
                          <h2>
                            {attr.trait_type}
                          </h2>
                          <h1>
                            {attr.value}
                          </h1>
                        </div>
                      ),
                    )}
                  </div>
                </>
              )}

            {eventsData && eventsData?.length > 0 ? (
              <p >
                History
              </p>
            ) : (
              isLoading && (
                <div />
              )
            )}

            {eventsLoading ? (
              <div />
            ) : (
              <div >
                {eventsData?.map((event) => (
                  <HistoryCard event={event} />
                ))}
              </div>
            )}
          </div>

          
            <PoweredBy />
          
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default NFTPage;
