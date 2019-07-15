
```jsx
const users =[
  {
    "_id": "5d2c6195094b7b21a5507b45",
    "fullname": "Ingrid Daugherty",
    "address": "222 Stratford Road, Saticoy, Virgin Islands, 5140",
    "name": {
      "firstName": "Mcintosh",
      "surname": "Trujillo"
    }
  },
  {
    "_id": "5d2c61955f5e2540cec9a356",
    "fullname": "Sexton Campos",
    "address": "279 Virginia Place, Zarephath, South Dakota, 8419",
    "name": {
      "firstName": "Ramirez",
      "surname": "Lloyd"
    }
  },
  {
    "_id": "5d2c6195092a7dbfaaef8cf2",
    "fullname": "Clay Slater",
    "address": "664 Centre Street, Nettie, Missouri, 4479",
    "name": {
      "firstName": "Pat",
      "surname": "Delaney"
    }
  },
  {
    "_id": "5d2c6195b8e46ce48fa77074",
    "fullname": "Eloise Barnes",
    "address": "400 Tapscott Avenue, Axis, North Carolina, 9659",
    "name": {
      "firstName": "Nash",
      "surname": "Hatfield"
    }
  },
  {
    "_id": "5d2c6195c2af66cca1f0c0a4",
    "fullname": "Bethany Hays",
    "address": "110 Narrows Avenue, Tyro, Ohio, 2440",
    "name": {
      "firstName": "Macias",
      "surname": "Ochoa"
    }
  },
  {
    "_id": "5d2c619535f11fa44d0b1d2e",
    "fullname": "Darlene Love",
    "address": "649 Varick Avenue, Spelter, Northern Mariana Islands, 109",
    "name": {
      "firstName": "James",
      "surname": "Alston"
    }
  },
  {
    "_id": "5d2c6195e296c464f22da735",
    "fullname": "Caitlin Barber",
    "address": "866 Box Street, Blanco, Wisconsin, 7236",
    "name": {
      "firstName": "Randall",
      "surname": "Mejia"
    }
  },
  {
    "_id": "5d2c6195604b141e1c33b927",
    "fullname": "Malone Whitfield",
    "address": "952 Foster Avenue, Rockhill, Oregon, 1294",
    "name": {
      "firstName": "Riley",
      "surname": "Santos"
    }
  },
  {
    "_id": "5d2c6195e977c54871503b0e",
    "fullname": "Kitty Cole",
    "address": "438 Berriman Street, Clarksburg, Puerto Rico, 5244",
    "name": {
      "firstName": "Pugh",
      "surname": "Henry"
    }
  },
  {
    "_id": "5d2c619577b7be31c20e3524",
    "fullname": "Copeland Camacho",
    "address": "941 Heath Place, Groveville, Nevada, 8689",
    "name": {
      "firstName": "Kaye",
      "surname": "Payne"
    }
  },
  {
    "_id": "5d2c6195b7657e4d9b5e4437",
    "fullname": "Ortiz Briggs",
    "address": "240 Mersereau Court, Morningside, New Hampshire, 8922",
    "name": {
      "firstName": "Martina",
      "surname": "Mcfarland"
    }
  },
  {
    "_id": "5d2c619526cb9fa6e4dfafef",
    "fullname": "Fannie Gates",
    "address": "625 Kensington Walk, Hebron, Arizona, 2226",
    "name": {
      "firstName": "Sherrie",
      "surname": "Lancaster"
    }
  },
  {
    "_id": "5d2c6195a4420ddb25d7fe86",
    "fullname": "Wilkerson Mcgee",
    "address": "730 Monaco Place, Fillmore, Utah, 5682",
    "name": {
      "firstName": "Tania",
      "surname": "Olsen"
    }
  },
  {
    "_id": "5d2c61950e58ecd940c877c6",
    "fullname": "Kelli Moran",
    "address": "284 Knickerbocker Avenue, Alfarata, Tennessee, 8517",
    "name": {
      "firstName": "Fitzgerald",
      "surname": "Cox"
    }
  },
  {
    "_id": "5d2c619584777c3b28e5d514",
    "fullname": "Harrison Burnett",
    "address": "835 Blake Court, Waterview, Vermont, 6712",
    "name": {
      "firstName": "Rojas",
      "surname": "Jarvis"
    }
  }
]
... 
<UrlTable
    data={users}
    uniqProp={'_id'}
    fields={['fullname', 'address']}
    headers={['Name', 'Address']}
    pagination={false}
/>
```
