# Country Search App

By Mirza Nor Azman

## Instructions

1. Navigate to [repo](https://github.com/mirzanorazman/country-search-app)
2. Clone locally using `git clone https://github.com/mirzanorazman/country-search-app`
3. Install dependencies using `yarn install`
4. Start the client server using `yarn start`
5. Fire up the php server using `php -S localhost:8000`
6. Navigate to app in [browser](http://localhost:3000)
7. Enjoy!

## Discussion

The technologies I used to build this app are: HTML, CSS, React for the front-end and PHP for the backend. I used [create-react-app](https://github.com/facebookincubator/create-react-app) to generate the scaffolding for this app.

## Requirements

- [ / ] Use the REST Countries api as your data source (https://restcountries.eu/).
- [ / ] An HTML form input will accept the string of a country name or code.
- [ / ] An error message will be emitted if users submit the form without input or if the search yields no
  results.
- [ / ] The form data must be submitted via Javascript to a PHP server that then will retrieve data from
  the REST Countries api and return it to the frontend. Do not attempt to cache results from the
  REST Countries api. The PHP endpoint you build should return JSON and include all the data
  necessary to render the view as described.
- [] Search is possible by country name, full name, or
  code.
- [] On the server sort the countries returned by population in descending order. The page
  should not reload.
- [] The search results should be displayed on an HTML page. For each country displayed include:
  the full name, alpha code 2, alpha code 3, flag image, region, subregion, population, and a list
  of its languages.
- [] At the bottom of the page show the total number of countries and list all regions and subregions
  contained in the results with the number of times it appeared.
