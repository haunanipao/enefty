import { blockExplorer } from "@/consts/parameters";
import { LinkIcon } from "@/icons/LinkIcon";
import { truncateAddress } from "@/utils/truncateAddress";
import type { ContractEvent } from "@thirdweb-dev/sdk";
import type { FC } from "react";
import { Link, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";

interface HistoryCardProps {
  event: ContractEvent<Record<string, any>>;
}

export const HistoryCard: FC<HistoryCardProps> = ({ event }) => {
  
  return (
    <Link
      href={`${blockExplorer}/tx/${event.transaction.transactionHash}`}
      target="_blank"
      rel="noreferrer"
      key={event.transaction.transactionHash}
    >
      <TableContainer>
        <Table variant='simple' colorScheme='brand.200'>
          <Tbody>
            <Tr>
              <Td w="25%">{event.eventName}</Td>
              <Td w="25%">{truncateAddress(event.data.from)}</Td>
              <Td w="25%">{truncateAddress(event.data.to)}</Td>
              <Td w="25%"><LinkIcon /></Td>
            </Tr>    
          </Tbody>
        </Table>
      </TableContainer>
    </Link>
  );
};
