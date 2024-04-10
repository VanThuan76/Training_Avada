import React, {useState, useCallback, useReducer, useEffect} from 'react';
import {
  Bleed,
  Layout,
  Page,
  LegacyCard,
  LegacyTabs,
  Grid,
  Text,
  Checkbox,
  InlineGrid,
  BlockStack,
  Select,
  TextField,
  Card,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText
} from '@shopify/polaris';
import {
  tabSettings,
  desktopPositionOptions,
  pageRestrictionOptions,
  initStateSetting
} from '@assets/const/setting';
import {reducer} from '@assets/actions/storeActions';
import {setSetting} from '@assets/actions/storeActions';
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput';
import TimeRangeSlider from '@assets/components/TimeRangeSlider/TimeRangeSlider';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import useBeforeUnload from '@assets/hooks/utils/useBeforeUnload';
import useEditApi from '@assets/hooks/api/useEditApi';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [state, dispatch] = useReducer(reducer, initStateSetting);
  const [selectedTabs, setSelectedTabs] = useState(0);
  const handleTabChange = useCallback(selectedTabIndex => setSelectedTabs(selectedTabIndex), []);
  const {data, loading} = useFetchApi({url: '/settings'});
  const {handleEdit} = useEditApi({url: '/settings'});
  useEffect(() => {
    setSetting(dispatch, {...state.setting, ...data}, 'set');
  }, [loading]);
  useBeforeUnload();
  const handleSetting = () => {
    handleEdit(state.setting);
  };
  return (
    <Page
      fullWidth
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={{
        content: 'Save',
        tone: 'success',
        disabled: !state.isSave,
        onAction: handleSetting
      }}
    >
      <Bleed marginBlock={'200'}>
        <Layout sectioned>
          <Grid
            columns={{xs: 1, sm: 1, md: 3, lg: 7, xl: 7}}
            areas={{
              xs: ['notification', 'setting'],
              sm: ['notification', 'setting'],
              md: ['notification setting setting'],
              lg: ['notification notification setting setting setting setting setting'],
              xl: ['notification notification setting setting setting setting setting']
            }}
          >
            <Grid.Cell area="notification">
              <NotificationPopup />
            </Grid.Cell>
            <Grid.Cell area="setting">
              <LegacyCard>
                <LegacyTabs tabs={tabSettings} selected={selectedTabs} onSelect={handleTabChange}>
                  <LegacyCard.Section title={tabSettings[selectedTabs].description}>
                    {tabSettings[selectedTabs].id === 'avada-display' ? (
                      !loading ? (
                        <InlineGrid gap="1000" columns={1}>
                          <InlineGrid gap="300" columns={1}>
                            <DesktopPositionInput
                              label="Desktop Position"
                              options={desktopPositionOptions}
                              value={state.setting.desktopPosition}
                              helpText="The display position of the pop on your website"
                              onChange={value =>
                                setSetting(dispatch, {...state.setting, desktopPosition: value})
                              }
                            />
                            <Checkbox
                              label="Hide time ago"
                              checked={state.setting.hideTimeAgo}
                              onChange={bool =>
                                setSetting(dispatch, {...state.setting, hideTimeAgo: bool})
                              }
                            />
                            <Checkbox
                              label="Truncate content text"
                              helpText="If your product is long for one line, it will be truncated to 'Product na...'"
                              checked={state.setting.truncateProductName}
                              onChange={bool =>
                                setSetting(dispatch, {...state.setting, truncateProductName: bool})
                              }
                            />
                          </InlineGrid>
                          <BlockStack gap="300">
                            <Text as="h1" fontWeight="semibold">
                              TIMMING
                            </Text>
                            <InlineGrid gap="300" columns={{xs: 1, sm: 2}}>
                              <TimeRangeSlider
                                lable="Display duration"
                                helpText="How long each pop will display on your page"
                                max={100}
                                currentValue={state.setting.displayDuration}
                                onChange={value =>
                                  setSetting(dispatch, {
                                    ...state.setting,
                                    displayDuration: value
                                  })
                                }
                              />
                              <TimeRangeSlider
                                lable="Time before the first pop"
                                helpText="The delay time before the first notification"
                                max={100}
                                currentValue={state.setting.firstDelay}
                                onChange={value =>
                                  setSetting(dispatch, {
                                    ...state.setting,
                                    firstDelay: value
                                  })
                                }
                              />
                              <TimeRangeSlider
                                lable="Gap time between two pops"
                                helpText="The time interval between two popup notification"
                                max={100}
                                currentValue={state.setting.popsInterval}
                                onChange={value =>
                                  setSetting(dispatch, {
                                    ...state.setting,
                                    popsInterval: value
                                  })
                                }
                              />
                              <TimeRangeSlider
                                lable="Maximum of popups"
                                helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
                                max={80}
                                currentValue={state.setting.maxPopsDisplay}
                                onChange={value =>
                                  setSetting(dispatch, {
                                    ...state.setting,
                                    maxPopsDisplay: value
                                  })
                                }
                              />
                            </InlineGrid>
                          </BlockStack>
                        </InlineGrid>
                      ) : (
                        <SettingSkeleton />
                      )
                    ) : !loading ? (
                      <InlineGrid gap="500" columns={1}>
                        <Select
                          options={pageRestrictionOptions}
                          onChange={value =>
                            setSetting(dispatch, {...state.setting, allowShow: value})
                          }
                          value={state.setting.allowShow}
                        />
                        <TextField
                          label="Excluded Pages"
                          helpText="Page URLs NOT to show the pop-up (sepeared by new lines)"
                          value={state.setting.excludedUrls}
                          onChange={value =>
                            setSetting(dispatch, {...state.setting, excludedUrls: value})
                          }
                          multiline={4}
                          autoComplete="off"
                        />
                      </InlineGrid>
                    ) : (
                      <SettingSkeleton />
                    )}
                  </LegacyCard.Section>
                </LegacyTabs>
              </LegacyCard>
            </Grid.Cell>
          </Grid>
        </Layout>
      </Bleed>
    </Page>
  );
}

Settings.propTypes = {};

const SettingSkeleton = ({loop = 1}) => {
  return Array.from(Array(loop)).map((value, key) => (
    <Card sectioned key={key}>
      <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText lines={6} />
      </TextContainer>
    </Card>
  ));
};
