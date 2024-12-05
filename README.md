# Scrappio

A simple and efficient command-line tool for scraping data from websites using Puppeteer. This application lets you extract user's github bio from github profile page by specifying a username.

## Features

- Extract user's github bio from github profile page by specifying a username.
- Save the extracted data to a CSV file.
- Check if the user's bio already exists in the CSV file before saving to avoid duplicates.
- Easy-to-use CLI interface.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/king-aggor/scrappio.git
cd scrappio
```

2. Install dependencies:

```bash
npm install
```

3. Link the CLI globally for system-wide use:

```bash
npm link
```

## Usage

```bash
scrappio scrape --userName=<username>
```

### options

- `--userName`: The username of the github user to extract the bio from.

## Dependencies

- [Puppeteer](https://pptr.dev/): A Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.
- [CSV](https://csv.js.org/parse/): A CSV parser and formatter for Node.js
- [yargs](https://www.npmjs.com/package/yargs): A parsing library that will help us parse the command-line arguments.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
