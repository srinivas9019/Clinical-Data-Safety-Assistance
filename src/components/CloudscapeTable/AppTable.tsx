import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";

import TextFilter from "@cloudscape-design/components/text-filter";

import Pagination from "@cloudscape-design/components/pagination";

import { useCollection } from "@cloudscape-design/collection-hooks";

export default (props: any) => {
  const { items, collectionProps, filterProps, paginationProps } =
    useCollection(props?.data, {
      filtering: {
        empty: <p>{props?.otherProps?.emptyMsg}</p>,
        noMatch: <p>No Results Found !!</p>,
      },

      sorting: {
        defaultState: {
          sortingColumn: props?.otherProps?.preSortingCol || "",
          isDescending: true,
        },
      },
      pagination: {
        pageSize: props?.otherProps?.pageSize ? props?.otherProps.pageSize : 5,
      },
    });

  return (
    <>
      {props?.otherProps?.isSimpleTable ? (
        <Table
          columnDefinitions={props?.columns}
          items={items}
          {...collectionProps}
          loadingText="Loading..."
          sortingDisabled
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <span  data-table-empty-result-text data-font-ember-bold>{props?.otherProps?.emptyMsg || "No Data !!"}</span>
              </SpaceBetween>
            </Box>
          }
        />
      ) : (
        <Table
          columnDefinitions={props?.columns}
          enableKeyboardNavigation
          items={items}
          {...collectionProps}
          filter={<TextFilter {...filterProps} />}
          pagination={<Pagination {...paginationProps} />}
          loadingText="Loading..."
          resizableColumns
          stickyHeader
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <span  data-table-empty-result-text data-font-ember-bold>{props?.otherProps?.emptyMsg || "No Data !!"}</span>
              </SpaceBetween>
            </Box>
          }
        />
      )}
    </>
  );
};
