import useDebounce from "@/hooks/useDebounce";
import { FC, useEffect, useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Button, Flex, Input, InputGroup, InputLeftElement, Link} from "@chakra-ui/react";

interface IProps {
  page: number;
  setPage: (page: number) => void;
  noOfPages: number;
  loading: boolean;
}

const PaginationHelper: FC<IProps> = ({
  page,
  setPage,
  noOfPages,
  loading,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [pageInput, setPageInput] = useState<number>(page);
  const debouncedSearchTerm = useDebounce(String(pageInput), 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      setPage(Number(debouncedSearchTerm));
      setIsSearching(false);
    } else {
      setPage(1);
    }
  }, [debouncedSearchTerm]);

  return (
    <Flex gap={5}>
      {isSearching || loading ? (
        <div></div>
      ) : (
        <>
          <Button leftIcon={<ChevronLeftIcon/>} colorScheme="brand" w={10} h={10}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
          </Button>

          <Input bg="brand.50" colorScheme="brand" w={10} h={10}
            type="number" 
            onChange={(e) => setPageInput(Number(e.target.value))}
            value={pageInput}
          />

          <Button rightIcon={<ChevronRightIcon/>} colorScheme="brand" w={10} h={10}
            onClick={() => setPage(page + 1)}
            disabled={page === noOfPages}
          > 
          </Button>
        </>
      )}
    </Flex>
  );
};

export { PaginationHelper };
