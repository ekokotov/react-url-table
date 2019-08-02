```javascript
<UrlTable
    url="https://reqres.in/api/users?page=1&per_page=5"
   fetchSuccess={res => res.data}
    headers={['Email', 'First name', 'Last name']}
    fields={['email', 'first_name', 'last_name']}
    indexField={'id'}
/>
```
