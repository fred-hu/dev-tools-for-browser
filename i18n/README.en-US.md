<p align="center">
  <img alt="Dev-Tools" src="https://github.com/fred-hu/dev-tools-for-browser/raw/main/assets/icon.png" width="64"/>
</p>
<p align="center">Developer Tools</p>
<p align="center">(Manifest V3)</p>

<p align="center">
  <a href="../README.md">简体中文</a> | English
</p>

## Introduction
This is a browser extension that integrates multiple developer tools, aimed at improving developers' work efficiency.

## Features
- **MOCK**: Allows developers to simulate API response data, URL redirection, and modify HTTP response headers in the browser.
- **One-Click Unlock for Web Page Copy Restrictions**: Removes copy restrictions on web pages.
- **JSON to Types**: Convert JSON to TypeScript types.
- **QR Code**: Generate QR codes with one click.
- **Color Conversion**: Color conversion tool.

## Progress
- [x] MOCK
- [x] One-Click Unlock for Web Page Copy Restrictions
- [x] JSON to TS Types
- [ ] QR Code
- [ ] Color Conversion
- [ ] ...

## Installation
Method 1: Available on the Chrome Web Store...

Method 2: [dev-tools.zip](https://github.com/fred-hu/dev-tools-for-browser/releases) installation
```
1.	Download dev-tools.zip (https://github.com/fred-hu/dev-tools-for-browser/releases)
2.	Open the browser extensions page (chrome://extensions/)
3.	Enable Developer Mode
4.	Drag the downloaded dev-tools.zip into the browser extensions page
```

## Development
```
1.	git clone https://github.com/fred-hu/dev-tools-for-browser
2.	pnpm i
3.	pnpm run dev
4.	Open the browser extensions page (chrome://extensions/)
5.	Enable Developer Mode
6.	Load the unpacked extension
7.	Select the build/chrome-mv3-dev folder in the project root directory
```

## Build
```
1. git clone https://github.com/fred-hu/dev-tools-for-browser
2. pnpm i
2. pnpm run build
```

## Screenshots
<p align="center">
  <img src="https://github.com/fred-hu/dev-tools-for-browser/raw/main/assets/demo/panel.png" width="600"/>
</p>
<p align="center">
  <img src="https://github.com/fred-hu/dev-tools-for-browser/raw/main/assets/demo/mock.png" width="600"/>
</p>
<p align="center">
  <img src="https://github.com/fred-hu/dev-tools-for-browser/raw/main/assets/demo/jsontots.png" width="600"/>
</p>

## Contribution
Contributions to this project are welcome! If you have any suggestions or find any issues, please submit an Issue or Pull Request.

## License
This project is open-source under the MIT license. For more details, please refer to the LICENSE file.
