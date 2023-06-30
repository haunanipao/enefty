import { Flex, Image, Link, Text, useColorModeValue, HStack } from '@chakra-ui/react'
import { NAV_LOGO } from "@/consts/parameters";
import { PoweredBy } from "@/components/PoweredBy";
import type { FC } from "react";

export const Footer: FC = ({

}) => {
  return (
    <Flex
      p={"20px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap="2"
      direction="row"
      bg={useColorModeValue("brand.50", "brand.900")}
      color={useColorModeValue("brand.700", "brand.200")}
    >
      <Link to="/">
        <HStack gap="2"> 
          <Image w="50px" src="/logo-enefty.svg" alt="The Enefty Project by Haunani Pao, 2023" />
          <Text>{NAV_LOGO}</Text>
        </HStack>
      </Link>
      <Link href="https://linktr.ee/haunanipao" target="_blank">
        <Text>© 2023 Made with 💜 in Aotearoa/NZ by Haunani Pao</Text>
      </Link>
      <PoweredBy />
    </Flex>
  )
}