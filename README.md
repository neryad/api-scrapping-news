# API Scraping News

## Description
This Node.js web API scrapes news articles from various Dominican Republic news websites including Diario Libre, Listín Diario, Remolacha.net, El Nacional, and El Nuevo Diario.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/neryad/api-scrapping-news.git
   ```
2. Navigate to the project directory:
   ```
    cd api-scrapping-news
   ```
3. Install dependencies:
   ```bash
    npm install
    ```
## Usage

1. Start the server:
   ```bash
    npm start
   ```
2. Make HTTP requests to the following endpoints:
- /diariolibre: Scrapes news from Diario Libre.
- /listindiario: Scrapes news from Listín Diario.
- /remolacha: Scrapes news from Remolacha.net.
- /elnacional: Scrapes news from El Nacional.
- /elnuevodiario: Scrapes news from El Nuevo Diario.

## Example:

```bash
    curl http://localhost:3000/diariolibre
```
## Endpoints
*   Diario Libre
 GET /diariolibre: Get news articles from Diario Libre.

* Listín Diario
GET /listindiario: Get news articles from Listín Diario.

* Remolacha.net
GET /remolacha: Get news articles from Remolacha.net.

* El Nacional
GET /elnacional: Get news articles from El Nacional.

* El Nuevo Diario
GET /elnuevodiario: Get news articles from El Nuevo Diario.

## Contributing
Contributions are welcome! If you find any issues or want to add more features, feel free to open an issue or submit a pull request.

License
This project is licensed under the ISC License. See the LICENSE file for details.
