
```jsx
const users = [
  {
    "_id": "5d2c5f8fc7b6a1e2a01c2fb9",
    "fullname": "Karina Herrera",
    "address": "482 Verona Place, Homeland, Iowa, 2579",
    "name": {
      "firstName": "Kristina",
      "surName": "Dean"
    }
  },
  {
    "_id": "5d2c5f8f2072761163e24b41",
    "fullname": "Karla Pace",
    "address": "748 Canton Court, Zeba, Connecticut, 4664",
    "name": {
      "firstName": "May",
      "surName": "Lynch"
    }
  },
  {
    "_id": "5d2c5f8f1a62ac1742763758",
    "fullname": "Sharron Fulton",
    "address": "132 Turner Place, Hailesboro, Arizona, 6688",
    "name": {
      "firstName": "Elva",
      "surName": "Silva"
    }
  },
  {
    "_id": "5d2c5f8fb4647150584690dd",
    "fullname": "Fletcher Lowery",
    "address": "140 Raleigh Place, Onton, Florida, 6948",
    "name": {
      "firstName": "Paulette",
      "surName": "Hahn"
    }
  },
  {
    "_id": "5d2c5f8fcb4660ae27b35f51",
    "fullname": "Myra Santiago",
    "address": "883 Ocean Court, Cashtown, Montana, 3506",
    "name": {
      "firstName": "Melissa",
      "surName": "Cain"
    }
  },
  {
    "_id": "5d2c5f8f215b8b07ef9312c0",
    "fullname": "Susanne Prince",
    "address": "361 Drew Street, Emerald, Marshall Islands, 9268",
    "name": {
      "firstName": "Ana",
      "surName": "Odonnell"
    }
  },
  {
    "_id": "5d2c5f8f55ea8f10efc067ba",
    "fullname": "Janis Sykes",
    "address": "796 Lincoln Place, Williams, Virgin Islands, 9050",
    "name": {
      "firstName": "Genevieve",
      "surName": "Knowles"
    }
  }
]

... 
<UrlTable
        data={data}
        uniqProp={'_id'}
        headers={['First name', 'Surname', 'Address']}
        fields={['name.firstName', 'name.surName', 'address']}
    />
```
