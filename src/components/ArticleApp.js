import React, { useEffect, useState, useRef } from "react"

import {
  Flex,
  Wrap,
  WrapItem,
  Stack,
  Radio,
  RadioGroup,
  Collapse,
  Box,
  Heading,
  Link,
  Grid,
  GridItem,
  Center,
  Select,
  Text,
  Button,
  ChakraProvider,
} from "@chakra-ui/react"
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup,
} from "chakra-paginator"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

const ArticleList = ({ PostsData }) => {
  const copyPostsData = [...PostsData]
  const [articlesData, setArticlesData] = useState(PostsData)
  const [articleTotal, setArticleTotal] = useState(copyPostsData.length)
  const [show, setShow] = React.useState(false)
  const [sort, setSort] = React.useState(false)
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    )
  const [startYear, setStartYear] = useState(2020)
  const [years, setYears] = useState(range(startYear, 2022, 1).reverse())

  const [currentYear, setCurrentYear] = useState()
  const [currentType, setCurrentType] = useState()
  const [isTypeChecked, setIsTypeCheched] = useState()
  const [currentPublisher, setCurrentPublisher] = useState()
  const articleTypes = copyPostsData.map(article => article["Publication_Type"])
  const articleTypesUnique = articleTypes.filter((element, index) => {
    return articleTypes.indexOf(element) === index
  })

  const articlePublisher = copyPostsData.map(article => article["Publisher"])
  const articlePublisherAbstarct = articlePublisher.filter(item => {
    if (item !== undefined && item.length < 25) {
      return item
    }
  })
  const articlePublisherUnique = articlePublisherAbstarct.filter(
    (element, index) => {
      return articlePublisher.indexOf(element) === index
    }
  )

  const radioTypeRef = useRef([])
  const [radioTypechecked, setRadioTypechecked] = useState(false)

  // constants
  const outerLimit = 1
  const innerLimit = 1
  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    pageSize,
    setPageSize,
    offset, // you may not need this most of the times, but it's returned for you anyway
  } = usePaginator({
    total: articleTotal,
    initialState: {
      pageSize: 50,
      currentPage: 1,
      isDisabled: false,
    },
  })

  // effects
  useEffect(() => {
    let allArticlesData
    // 1- Filtered By Year
    if (
      currentYear !== undefined &&
      currentType === undefined &&
      currentPublisher === undefined
    ) {
      allArticlesData = copyPostsData.filter(
        article => article["Publication_Year"] === Number(currentYear)
      )
      setArticleTotal(allArticlesData.length)
      //2- Filtered By Year and Type
    } else if (
      currentYear !== undefined &&
      currentType !== undefined &&
      currentPublisher === undefined
    ) {
      allArticlesData = copyPostsData.filter(
        article =>
          article["Publication_Year"] === Number(currentYear) &&
          article["Publication_Type"] === currentType
      )
      setArticleTotal(allArticlesData.length)
      //3- Filtered By Year and Type and Publisher
    } else if (
      currentYear !== undefined &&
      currentType !== undefined &&
      currentPublisher !== undefined
    ) {
      allArticlesData = copyPostsData.filter(
        article =>
          article["Publication_Year"] === Number(currentYear) &&
          article["Publication_Type"] === currentType &&
          article["Publisher"] === currentPublisher
      )
      setArticleTotal(allArticlesData.length)
      //4- Filtered By Type
    } else if (
      currentYear === undefined &&
      currentType !== undefined &&
      currentPublisher === undefined
    ) {
      allArticlesData = copyPostsData.filter(
        article => article["Publication_Type"] === currentType
      )
      setArticleTotal(allArticlesData.length)
      //5- Filtered By Type and Publisher
    } else if (
      currentYear === undefined &&
      currentType !== undefined &&
      currentPublisher !== undefined
    ) {
      allArticlesData = copyPostsData.filter(
        article =>
          article["Publication_Type"] === currentType &&
          article["Publisher"] === currentPublisher
      )
      setArticleTotal(allArticlesData.length)
      //6- Filtered By Year and Publisher
    } else if (
      currentYear !== undefined &&
      currentType === undefined &&
      currentPublisher !== undefined
    ) {
      allArticlesData = copyPostsData.filter(
        article =>
          article["Publication_Year"] === Number(currentYear) &&
          article["Publisher"] === currentPublisher
      )
      setArticleTotal(allArticlesData.length)
      //7- Filtered By Publisher
    } else if (
      currentYear === undefined &&
      currentType === undefined &&
      currentPublisher !== undefined
    ) {
      allArticlesData = copyPostsData.filter(
        article => article["Publisher"] === currentPublisher
      )
      setArticleTotal(allArticlesData.length)
      //8- No Filter
    } else {
      allArticlesData = [...copyPostsData]
    }

    if (sort) {
      const beforeSort = [...allArticlesData]
      const sortedArticle = beforeSort.sort(
        (a, b) =>
          parseFloat(b["Publication_Year"]) - parseFloat(a["Publication_Year"])
      )
      allArticlesData = [...sortedArticle]
      console.log("sort", sort)
    }

    const articlesInPagination = allArticlesData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )
    setArticlesData(articlesInPagination)

    console.log("All Artciles In Page", articlesInPagination)
    console.log("Artciles Data", articlesData)
  }, [
    currentPage,
    pageSize,
    offset,
    currentYear,
    currentType,
    currentPublisher,
    sort,
  ])

  // styles
  const baseStyles = {
    w: 7,
    fontSize: "sm",
  }

  const normalStyles = {
    ...baseStyles,
    _hover: {
      bg: "green.300",
    },
    bg: "red.300",
  }

  const activeStyles = {
    ...baseStyles,
    _hover: {
      bg: "blue.300",
    },
    bg: "green.300",
  }

  const separatorStyles = {
    w: 7,
    bg: "green.200",
  }

  // handlers
  const handleToggle = () => {
    if (!show) {
      setShow(!show)
      setYears(range(startYear, 2022, 1).reverse())
      setStartYear(startYear - 1)
    } else {
      setShow(!show)
    }
  }

  const onChangeType = value => {
    setCurrentType(value)
    setIsTypeCheched(true)
  }

  const handlePageChange = nextPage => {
    // -> request new data using the page number
    setCurrentPage(nextPage)
  }

  const handlePageSizeChange = event => {
    const pageSize = Number(event.target.value)

    setPageSize(pageSize)
  }

  const handleDisableClick = () => {
    return setIsDisabled(oldState => !oldState)
  }

  const clearFilterYear = () => {
    setCurrentYear(undefined)
    setArticleTotal(copyPostsData.length)
    console.log("clear currentYear", currentYear)
  }

  const clearFilterType = () => {
    setCurrentType(undefined)
    setArticleTotal(copyPostsData.length)
    radioTypeRef.current.forEach(item => {
      item.style.color = "red"
      item.style.background = "red!important"
      console.log("radio item", item)
    })

    console.log("current ref", radioTypeRef.current)
  }

  const clearFilterPublisher = () => {
    setCurrentPublisher(undefined)
    setArticleTotal(copyPostsData.length)
  }
  const sortByDate = () => {
    setSort(!sort)
  }
  return (
    <ChakraProvider>
      <Flex justifyContent="space-between" mt={7}>
        <Text>{copyPostsData.length} results</Text>

        <Button variant={"link"} colorScheme="orange" onClick={sortByDate}>
          {sort ? "Reset to Deafult" : "Sort by Date"}
        </Button>
      </Flex>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={[5, null, null, 1]}>
          <Heading as="h4" textAlign="left" fontSize="small" mt={10} mb={4}>
            Refine By
          </Heading>
          <Wrap spacing="30px">
            <WrapItem width={{ lg: "250px" }}>
              <Heading
                as="h5"
                textAlign="left"
                fontSize="small"
                color="green.700"
              >
                Years
                {currentYear !== undefined && (
                  <Button variant={"link"} onClick={clearFilterYear} ml={5}>
                    Clear Filter
                  </Button>
                )}
                <>
                  <Collapse startingHeight={65} in={show}>
                    <RadioGroup
                      defaultValue={undefined}
                      mt={3}
                      colorScheme="cyan"
                      onChange={setCurrentYear}
                      value={currentYear}
                      ml={2}
                    >
                      <Stack spacing={4}>
                        {years.map(year => (
                          <Radio
                            value={year}
                            key={year}
                            _checked={{ borderColor: "rgb(226, 232, 240)" }}

                          >
                            {year}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Collapse>
                  <Button size="sm" onClick={handleToggle} mt="1rem">
                    Show {show ? "Less" : "More"}
                  </Button>
                </>
              </Heading>
            </WrapItem>

            <WrapItem width={{ lg: "250px" }}>
              <Heading
                as="h5"
                textAlign="left"
                fontSize="small"
                color="green.700"
              >
                Publication Type
                {currentType !== undefined && (
                  <Button variant={"link"} onClick={clearFilterType} ml={5}>
                    Clear Filter
                  </Button>
                )}
                <RadioGroup
                  defaultValue={undefined}
                  mt={3}
                  colorScheme="cyan"
                  onChange={setCurrentType}
                  value={currentType}
                  ml={2}
                >
                  <Stack spacing={4}>
                    {articleTypesUnique.map((articleType, i) => (
                      <Radio
                        value={articleType}
                        key={articleType}
                        ref={el => (radioTypeRef.current[i] = el)}
                        _checked={{ borderColor: "rgb(226, 232, 240)" }}
                      >
                        {articleType}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Heading>
            </WrapItem>
            <WrapItem width={{ lg: "250px" }}>
              <Heading
                as="h5"
                textAlign="left"
                fontSize="small"
                color="green.700"
              >
                Publisher
                {currentPublisher !== undefined && (
                  <Button
                    variant={"link"}
                    onClick={clearFilterPublisher}
                    ml={5}
                  >
                    Clear Filter
                  </Button>
                )}
                <RadioGroup
                  defaultValue={undefined}
                  mt={3}
                  colorScheme="cyan"
                  onChange={setCurrentPublisher}
                  value={currentPublisher}
                  ml={2}
                >
                  <Stack spacing={4}>
                    {articlePublisherUnique.map(articlePublisher => (
                      <Radio
                        value={articlePublisher}
                        key={articlePublisher}
                        _checked={{ borderColor: "rgb(226, 232, 240)" }}
                      >
                        {articlePublisher}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Heading>
            </WrapItem>
          </Wrap>
        </GridItem>
        <GridItem colSpan={[5, null, null, 4]}>
          <Box>
            {articlesData.map(post => (
              <Box
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                key={post["Article Title"]}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: "3", sm: "0" }}
                >
                  <Heading
                    marginTop="1"
                    textAlign="left"
                    fontSize={["large", "2xl", "3xl"]}
                  >
                    <Link
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      {post["Article_Title"]}
                    </Link>
                  </Heading>
                  <Text
                    as="p"
                    marginTop="2"
                    textAlign="left"
                    color="gray.500"
                    fontSize="sm"
                    noOfLines={4}
                  >
                    {post["Abstract"]}
                  </Text>
                  <Text fontSize="sm" textAlign="left" color="black">
                    <strong>Authors: </strong> {post["Authors"]}
                  </Text>
                  <Text fontSize="sm" textAlign="left" color="black">
                    <strong>Publication Year: </strong>{" "}
                    {post["Publication_Year"]}
                  </Text>
                  <Text fontSize="sm" textAlign="left" color="black">
                    <strong>Publication Type: </strong>{" "}
                    {post["Publication_Type"]}
                  </Text>
                  <Text fontSize="sm" textAlign="left" color="black">
                    <strong>Publisher: </strong> {post["Publisher"]}
                  </Text>
                </Box>
              </Box>
            ))}

            <Paginator
              isDisabled={isDisabled}
              activeStyles={activeStyles}
              innerLimit={innerLimit}
              currentPage={currentPage}
              outerLimit={outerLimit}
              normalStyles={normalStyles}
              separatorStyles={separatorStyles}
              pagesQuantity={pagesQuantity}
              onPageChange={handlePageChange}
            >
              <Container align="center" justify="space-between" w="full" p={4}>
                <Previous>
                  <ChevronLeftIcon />
                  {/* Or an icon from `react-icons` */}
                </Previous>
                <PageGroup isInline align="center" />
                <Next>
                  <ChevronRightIcon />
                  {/* Or an icon from `react-icons` */}
                </Next>
              </Container>
            </Paginator>
            <Center w="full">
              <Button onClick={handleDisableClick}>Disable ON / OFF</Button>
              <Select w={40} ml={3} onChange={handlePageSizeChange}>
                <option value="50" defaultValue={50}>
                  50
                </option>
                <option value="25">25</option>
                <option value="10">10</option>
              </Select>
            </Center>
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  )
}

export default ArticleList
