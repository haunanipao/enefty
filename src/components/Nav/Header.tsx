import { contractAddress } from "@/consts/parameters";
import {
  ConnectWallet,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import { NAV_LOGO } from "@/consts/parameters";
import { Box, Flex, Heading, InputGroup, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@/icons/SearchIcon";
import { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  return (
    
    <Flex p={10} justifyContent={"space-between"} alignItems={'center'}
          bg={useColorModeValue('brand.50', 'brand.900')}
          color={useColorModeValue('brand.700', 'brand.200')}> 
      <Link to="/">
        <Heading as="h1" size="lg">{NAV_LOGO}</Heading>
      </Link>
      {/* <Flex>
        <InputGroup gap={4} alignItems={'center'} >
          <inputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <input type="text" w={"600px"} name="Collection address" size="lg" bg="white.50" color="brand.700"
              borderColor="brand.900"
              placeholder="Collection address?"
              _placeholder={{ color: 'inherit' }}
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
              value={search}
          />
        </InputGroup>
      </Flex> */}
      <ConnectWallet colorScheme="brand" />
    </Flex>
  );
};
