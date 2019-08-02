> NOTE: pass editable={true} as root attribute or as header attribute. In this example just 'Age' column is editable.
 

```javascript
<UrlTable
    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
     headers={['Name', {name: 'Age', editable: true}, 'Eyes', 'Phone', 'Favorite fruit']}
    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
    indexField={'_id'}
/>
```
> BTW, you can pass editable={true} as root attribute to make all cells editable and then add editable={false} to certain column to disable editing for them.
