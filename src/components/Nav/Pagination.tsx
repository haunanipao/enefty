import { BigNumber } from "ethers";
import type { FC } from "react";
import { PaginationHelper } from "../PaginationHelper";
import { Flex, Heading, Text} from '@chakra-ui/react'

interface IProps {
  page: number;
  setPage: (page: number) => void;
  nftsPerPage: number;
  totalCount: BigNumber | undefined;
  loading: boolean;
}

export const Pagination: FC<IProps> = ({
  page,
  setPage,
  nftsPerPage,
  totalCount,
  loading,
}) => {
  if (!totalCount) return null;
  const noOfPages = Math.ceil(totalCount.toNumber() / nftsPerPage);
  const start = (page - 1) * nftsPerPage;
  const end = start + nftsPerPage;

  return (
    <Flex
      direction = "column"
      p={"20px"}
      justifyContent={"space-around"}
      alignItems={"center"}
      gap="5"
      direction="row"
      bg={"brand.100"}
    >
 
      <Heading>
        {end} / {totalCount.toNumber().toLocaleString()}
      </Heading>

      <PaginationHelper
        page={page}
        noOfPages={noOfPages}
        setPage={setPage}
        loading={loading}
      />

    </Flex>

  )
}
