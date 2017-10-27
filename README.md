# studiowaaz-localization

This is a port of the [0.5 Apostrophe Localization](https://github.com/punkave/apostrophe-localization) module, 
for the [Apostrophe 2.0](http://apostrophecms.org/) nodejs/express based CMS.

**This is not a production ready module** so please use carefully, and let us know of any issues and such.

## Installation
```
npm install studiowaaz-localization
```
## Configuration

You can configure this either at the application level

```
//app.js

modules:{
 ... other modules ...
  'studiowaaz-localization': {
    default: 'eu',
    locales: ['eu','fr','es']
  }
}
```

At the moment, module automatically redirect to a prefixed locale slug. For example '/' is redirect to '/eu/' with the previous configuration.

Pieces / Pages **properties** are localized using the ```localized``` key on docs. So it can be a performance problem if you have a lot of translations.

## Use
Just switch locale in url and add content to your pages or pieces.
### Making link to localized url
Each page or piece had a ```_localeurl``` property. Use it in order to ```_url```.
### Get current locale from template
```{{ apos.waaz.getLocale() }}```  

## TODO  
- [ ] Never Types
- [ ] Universal Content
- [ ] aposLocalized collection implement to stop storing translations on the aposDocs.
- [ ] task to initialize existing content on default locale