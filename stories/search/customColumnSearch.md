> if header.searchable allows you to control searchable columns
In this example  you can't search by users name

 ```javascript
<UrlTable
    search={true}
    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
    headers={[{name: 'Name', searchable: false}, 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
    indexField={'_id'}
/>
```
