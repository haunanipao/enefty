import { contractAddress } from "@/consts/parameters";
import { ConnectWallet, useContract, useNFT } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import { NAV_LOGO } from "@/consts/parameters";
import { Box, Flex, Heading, HStack, Image, Input, InputGroup, InputLeftElement,  Text, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@/icons/SearchIcon";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  return (
    
    <Flex p={5} justifyContent={"space-between"} alignItems={'center'}
          bg={useColorModeValue('brand.50', 'brand.900')}
          color={useColorModeValue('brand.700', 'brand.200')}> 
      <Link to="/">
        <HStack gap="2"> 
          <Image w="100px" src="/logo-enefty.svg" alt="The Enefty Project by Haunani Pao, 2023" />
          <Heading as="h1" size="lg">{NAV_LOGO}</Heading>
        </HStack>
      </Link>
      <Flex>
        <Text>Todo: Case Study and color wallet connection</Text>
      </Flex>
      <ConnectWallet colorScheme="brand" />
    </Flex>
  );
};
