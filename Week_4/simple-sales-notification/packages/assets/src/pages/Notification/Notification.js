import {useState} from 'react';
import {
  LegacyCard,
  ResourceList,
  Page,
  Bleed,
  Scrollable,
  ResourceItem,
  Box,
  Text,
  InlineStack
} from '@shopify/polaris';
import usePaginate from '@assets/hooks/api/usePaginate';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import {DEFAULT_PARAMS, SORT_OPTIONS} from '@assets/const/table';
import {DEFAULT_NOTIFICATION} from '@assets/components/NotificationPopup/NotificationPopup';
import {formatDateOnly} from '@assets/helpers/utils/formatFullTime';

const Notification = () => {
  const [limit, setLimit] = useState(5);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState(DEFAULT_PARAMS.sorts[0].direction);
  const {data: notifications, loading, onQueryChange, prevPage, nextPage} = usePaginate({url: '/notifications', defaultLimit: limit, defaultSort: `createdAt:${sortValue}`});
  const handlerBulkActions = () => {
    const actions = ['INCOMPLETE', 'COMPLETE', 'DELETE'];
    return actions.map(action => {
      return {
        content: action,
        onAction: () => {}
      };
    });
  };
  const paginationConfig = {
    onNext: () => nextPage(),
    onPrevious: () => prevPage(),
    label: `${limit} records / page`,
    type: 'table'
  };
  const onSortChange = (selected) => {
    setSortValue(selected)
    onQueryChange('sort', `createdAt:${sortValue}`, true)
  }
  return (
    <Page fullWidth title="Notifications" subtitle="List of sales notification from Shopify">
      <Bleed marginBlock={'200'}>
        <LegacyCard>
          <ResourceList
            loading={loading}
            resourceName={{singular: 'notification', plural: 'notifications'}}
            items={loading ? DEFAULT_NOTIFICATION : notifications}
            renderItem={noti => {
              return (
                <ResourceItem id={noti.id}>
                  <InlineStack align="space-between">
                    <NotificationPopup
                      firstName={noti.firstName}
                      city={noti.city}
                      country={noti.country}
                      productName={noti.productName}
                      timestamp={noti.timestamp}
                      productImage={noti.productImage}
                    />
                    <Box>
                      <Text as="p">From {formatDateOnly(noti.createdAt)}</Text>
                    </Box>
                  </InlineStack>
                </ResourceItem>
              );
            }}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            bulkActions={handlerBulkActions()}
            sortValue={sortValue}
            sortOptions={SORT_OPTIONS}
            onSortChange={selected => {
              onSortChange(selected);
              setSortValue(selected);
            }}
            pagination={paginationConfig}
          />
        </LegacyCard>
      </Bleed>
    </Page>
  );
};

export default Notification;
