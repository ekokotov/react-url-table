
```javascript
<UrlTable
    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
    indexField={'_id'}
    editable={true}
    onEdit={(newValue, propertyName, updatedRecord) => console.log(newValue, propertyName, updatedRecord)}
/>
```
> NOTE: open Actions tab and edit 'Age' property. use cell focus to navigate.

### Callback calls with arguments
 - newValue: string (updated value)
 - propertyName: string (record property name)
 - updatedRecord: object (object which was updated from the initial array)
