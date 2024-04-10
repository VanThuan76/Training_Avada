import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();

    if (this.pageRestriction({setting: settings, currentURL})) {
      await this.display({notifications: notifications, setting: settings});
    }
  }
  pageRestriction({setting, currentURL}) {
    if (setting.allowShow === 'All Pages') {
      if (!setting.includedUrls.some(item => item === currentURL)) {
        return false;
      }
    }
    if (setting.allowShow === 'One Page') {
      if (setting.excludedUrls.some(item => item === currentURL)) {
        return false;
      }
    }
    return true;
  }
  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  async display({notifications, setting}) {
    const container = document.querySelector('#Avada-SalePop');
    await this.delay(setting.firstDelay * 1000);
    const toDisplayNotis = notifications.slice(0, setting.maxPopsDisplay);
    for (const item of toDisplayNotis) {
      render(<NotificationPopup {...item} setting={setting} onClose={this.remove} />, container);
      this.fadeInUp();
      await this.delay(setting.displayDuration * 1000);
      this.fadeOut();
      await this.delay(setting.popsInterval * 1000);
      this.remove();
    }
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
