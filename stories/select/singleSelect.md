> NOTE: open Actions tab and click on row.
>  pass selectMode={'single'} to be able to select row. 

```javascript
<UrlTable
    selectMode={'single'}
    onSelect={action('onSelect')}
    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
    indexField={'_id'}
/>
```

Callback:
 ```javascript
 onSelect?: (records: IRecord[]) => void
```

