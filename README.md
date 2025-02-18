# Anatta Test

Repository featuring the Anatta Testing Assignment.

This was developed using plain Node with no external dependencies for ease of running.

The goal of the assignment is to query the supplied Shopify store for products by title, pulling the variant details, then sorting all results based upon the variant's price low to high and then outputting the sorted result to the console.

## Requirements

Node >= 22

## Installing

Nothing to install, there are no external dependencies required.

## Testing

`npm run test`

## Running

via `node app.js -help`:

```
Display a list of products matching a partial product name input.

Usage:
  node app.js -name [partial product name] -token [Shopify API token]

Example:
  node app.js -name snow -token xyz123
```

Both `-name` and `-token` are required.

### Example Output

Sucessful result:

```
Assignment Product 1 - variant 2 / black - price $10
Assignment Product 1 - variant 2 / white - price $10
Assignment Product 1 - variant 2 / red - price $10
Assignment Product 1 - variant 2 / blue - price $10
Assignment Product 1 - variant 5 / black - price $10
Assignment Product 1 - variant 5 / white - price $10
Assignment Product 1 - variant 5 / red - price $10
Assignment Product 1 - variant 5 / blue - price $10
Assignment Product 1 - variant 3 / black - price $15
Assignment Product 1 - variant 3 / white - price $15
Assignment Product 1 - variant 3 / red - price $15
Assignment Product 1 - variant 3 / blue - price $15
Assignment Product 2 - variant 3 / black - price $15
Assignment Product 2 - variant 3 / white - price $15
Assignment Product 2 - variant 3 / red - price $15
Assignment Product 2 - variant 3 / blue - price $15
Assignment Product 1 - variant 4 / black - price $20
...
```

No results:

```
No products found matching "glove".
```
