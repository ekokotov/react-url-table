## Render local array of objects
```javascript
import {data} from "../mocks/mock.json";

<UrlTable
    data={data}
    uniqProp={'_id'}
    fields={['name', 'address']}
    headers={['Name', 'Address']}
/>
```
