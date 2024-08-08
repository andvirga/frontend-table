# Frontend Table Task

This is a basic [Next.js](https://nextjs.org/) application that renders two tables, as requested in tech challenge.

## Getting Started

First, clone this repository:

```
git clone https://github.com/andvirga/frontend-table
```

Then run these commands to install dependencies and launch the project

```
yarn && yarn dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

### Page Contents

On the main page you will see two tables:

- A pure HTML/CSS table, this was built without using any third party library, just pure HTML, CSS and React.
- A MUI table, this was built using [Material-UI (MUI)](https://mui.com/material-ui/getting-started/) a popular library that implements Google´s Material Design and it's fully customizable.

### Checklist

#### Create a very simple Node.js app to host the files.

This was done using NextJS API Routes, the endpoint `http://localhost:3000/api?page=[PAGE_NUMBER]` accepts a page number and retrieves the paginated results for that page.

#### Implement the table layout.

This is done in:

- 'src/app/components/HTMLTable' (Pure HTML Table).
- 'src/app/components/ReactTable' (React MUI Table).

#### Implement the table functionality.

Pagination, Sorting and going to an specific page functions are implemented in both versions.

#### After you are happy with the solution, implement the same table in React.

Done in 'src/app/components/ReactTable' (React MUI Table).

#### Write a short debrief (8-10 sentences) on how you would improve this project further and/or any trade-offs you made to finish the project on time.

Some trade-offs:

- The Time column data isn't available in the provided JSON. Therefore, I decided to display an arbitrary calculation: `avgScrollPercentage * totalVisitorCount`. This wouldn't happen in a real project. In that case, I'd make sure to check with stakeholders to determine the proper value to display in that column.
- Some optimizations were left out due to time constraints. There is room to refactor the `HTMLTable` and `ReactTable` components, splitting them into smaller components with fewer lines of code.
- I've added basic validation on the page input located in the `ReactTable` component, but this can be improved to avoid hitting the API with an invalid page number.
- Due to time constraints, the data-manipulation states (pagination and sorting) are duplicated in `HTMLTable` and `ReactTable`. This can be improved by using a single source of truth like the Context API.
- I used my best judgment to meet all the requirements within the given time, but I am happy to explain potential improvements.
