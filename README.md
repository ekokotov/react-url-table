# react-url-table
> Smart and flexible table component built with React and for React projects. based on React16 hooks and [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite)

### ENV:
Typescript, Webpack, React 16 hooks, Mobx-react-lite (for optimized store management)
### Tests:
jest, enzyme, enzyme-adapter-react-16

## Usage

```jsx
<UrlTable
    url="https://randomuser.me/api/?page=1&results=10"
    fetchSuccess={(res: any): [] => res.results}
    headers={['Email', 'Gender', 'Cell', 'State']}
    fields={['email', 'gender', 'cell', 'location.state']}
    uniqProp={'login.uuid'}
    pagination={{
      pageSize: 5
    }}
/>
```
### Features TODO:
- [x] Render just with provided data
- [x] Load by URL
- [x] Virtual (client) pagination
- [x] Server controlled pagination
- [x] hide paging
- [x] Specify header names (array of string)
- [x] Specify header names (array of object(name: string, render?(name: string, property: string): string | React.ReactElement))
- [x] Specify fields names (array of string)
- [x] Specify fields names (array of object(name: string, render?(name: string, property: string): string | React.ReactElement))
- [x] Supports dot getters (like Object.property1.property2)
- [x] Empty headers
- [x] after loading data hook to map data from response(aka fetchSuccess)
- [x] fire onSelect
- [x] multiple selection
- [x] show loading indicator
- [x] show custom loading indicator
- [x] show error (for example catch data loading errors)
- [x] local client search
- [x] local client partial search (by specified fields)
- [ ] map/filter/change data hook before rendering
- [ ] server search
- [x] simple client sorting
- [x] configurable property sorting
- [x] client multiple-field sorting
- [x] sorting order panel
- [ ] server sorting example?
- [ ] editable cells
- [ ] editable one column cells and lock others
- [ ] reorder rows (drag-n-drop)
- [ ] reorder columns (drag-n-drop)
- [ ] resize column width
- [ ] custom row pattern/component
- [X] styling
- [ ] column highlighting (CSS only)
- [ ] Themes supporting
- [ ] prepare and register with NPM
