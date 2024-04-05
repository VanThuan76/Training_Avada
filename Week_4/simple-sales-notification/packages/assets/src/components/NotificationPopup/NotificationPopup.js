import React from 'react';
import './NoticationPopup.scss';
export const DEFAULT_NOTIFICATION = [{
  firstName: 'John Doe',
  city: 'New York',
  country: 'United States',
  productName: 'Puffer Jacket With Hidden Hood',
  timestamp: 'a day ago',
  productImage: 'http://paris.mageplaza.com/images/shop/single/big-1.jpg'
}];
const NotificationPopup = ({
  firstName = DEFAULT_NOTIFICATION[0].firstName,
  city = DEFAULT_NOTIFICATION[0].city,
  country = DEFAULT_NOTIFICATION[0].country,
  productName = DEFAULT_NOTIFICATION[0].productImage,
  timestamp = DEFAULT_NOTIFICATION[0].timestamp,
  productImage = DEFAULT_NOTIFICATION[0].productImage
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>purchased {productName}</div>
              <div className={'Avada-SP__Footer'}>
                {timestamp}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
