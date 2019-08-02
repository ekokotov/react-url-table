
```jsx
const users = [
    {
        "_id": "5d2c5b9ccbda8044e44fe651",
        "name": "Wolf Knapp",
        "address": "710 Vandervoort Place, Fairmount, West Virginia, 8488"
    },
    {
        "_id": "5d2c5b9cbb2a3eedae27a8e4",
        "name": "Cooke Henry",
        "address": "182 Varick Avenue, Bancroft, Washington, 6017"
    },
    {
        "_id": "5d2c5b9c3603a650d1368c38",
        "name": "Barrera Williams",
        "address": "858 Beaumont Street, Cornucopia, South Dakota, 551"
    },
    {
        "_id": "5d2c5b9cba4ec8dcec02f81c",
        "name": "Valerie Mcclure",
        "address": "935 Frost Street, Adelino, Montana, 6817"
    },
    {
        "_id": "5d2c5b9ce9e828c29bd5c015",
        "name": "Oliver Holmes",
        "address": "717 Luquer Street, Independence, Indiana, 9650"
    },
    {
        "_id": "5d2c5b9c9ae6ec49a53976ea",
        "name": "Ola Oneal",
        "address": "131 Hawthorne Street, Worton, New Hampshire, 8380"
    },
    {
        "_id": "5d2c5b9c1932a4d734f39b3a",
        "name": "Kerri Colon",
        "address": "283 Doscher Street, Curtice, New Mexico, 3593"
    }
]
... 
<UrlTable
    data={users}
    indexField={'_id'}
    fields={['name', 'address']}
/>
```
