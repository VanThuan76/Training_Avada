const tabSettings = [
  {
    id: 'avada-display',
    content: 'Display',
    description: 'APPEARANCE',
    panelID: 'avada-display-content'
  },
  {
    id: 'avada-trigger',
    content: 'Trigger',
    description: 'PAGES RESTRICTIONS',
    panelID: 'avada-trigger-content'
  }
];
const desktopPositionOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];
const pageRestrictionOptions = [
  {label: 'All Pages', value: 'All Pages'},
  {label: 'One Page', value: 'One Page'}
];

const initStateSetting = {
  setting: {
    desktopPosition: desktopPositionOptions[0].value,
    hideTimeAgo: false,
    truncateProductName: true,
    displayDuration: 5,
    firstDelay: 10,
    popsInterval: 2,
    maxPopsDisplay: 20,
    allowShow: pageRestrictionOptions[0].value,
    excludedUrls: ''
  },
  isSave: false
};
export {tabSettings, desktopPositionOptions, pageRestrictionOptions, initStateSetting};
