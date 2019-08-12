> NOTE: open Actions tab and click on row.
>  pass selectMode={'multiple'} to be able to select row. Press again to already selected row to unselect.

```javascript
<UrlTable
    selectMode={'multiple'}
    onSelect={action('onSelect')}
    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
    indexField={'_id'}
/>
```
