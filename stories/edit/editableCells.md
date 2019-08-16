> NOTE: pass editable={true} as root attribute or as header attribute. If you pass editable={true} as root attribute all cells in the table will be editable.

> Enter Edit mode: double click or click + Enter

> exit from editing: Escape or blur (click outside)

```javascript
<UrlTable
    editable={true}
    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
    indexField={'_id'}
/>
```
