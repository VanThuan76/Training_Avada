# Simple Sales Notfication

## Description: 
- This is a Shopify application which helps merchants to display recent sales as notifications on their store. Whenever there is new sales, the notification list should be updated as well. With this app, merchants can customize how the popup display from our app backend easily with beautiful design.
- Example:
![image](https://i.imgur.com/B1dcWIJ.png)

## Business Logic(Requirements)

### Installatioin logic
- Shopify Store -> Install Simple Notification App 
- Within (API scopes)
    1. 'read_themes',
    2. 'write_themes',
    3. 'read_orders',
    4. 'read_products',
    5. 'read_script_tags',
    6. 'write_script_tags'
- After installation
    - Sync first 30 orders of the store to notifications
    - Register scripttag - an JS script to run on frontend
    - Add default setting for the store
    - Register orders/create webhook to update notification list
### React App logic
- AVADA React App 
    - PUT/POST/DELETE information
- AVADA Admin API( Manage notifications GRID And Manage settings )
    - GET information 
### Storefront logic
- Storefront logic
    - GET settings and notifications data
- Client public API(Return notifications)
    - With the setting and notifications list using SCRIPTTAG
- Display the notifications
### Data Structure
- Collection: shopInfos, shops, subscriptions, settings, notifications
- Shop(1 Setting)(~Notifiaction)

## Document
- Design: https://www.figma.com/file/nPFk5iavr3g3QzClsnFL3o/Sales-Notifications---AVADA-Training-Program?type=design&node-id=1-253&mode=design&t=T0gYaxqdHaF0OBG3-0
