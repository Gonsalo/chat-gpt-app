# Chat GPT Desktop App

[Chat GPT Desktop App]([https://github.com/your-username/chat-gpt-desktop-app](https://github.com/Gonsalo/chat-gpt-app)) is a local desktop application that allows you to run a chat session with OpenAI's Chat GPT, without the need of using any remote databases.

This application is designed to mimic the functionality of Chat GPT, providing a native desktop experience. The app uses ElectronJS with ReactJS and Redux for its user interface, and npm as its package manager.

## Features

- No external databases. The app keeps your conversations locally.
- Interactive dialog on initial start up to set up application resources location.
- Mandatory to insert ChatGPT API key to proceed.
- Markdown messages support with special attention to code highlights.
- Real-time count of tokens and estimate for conversation costs.

## Installation 

### Prerequisites

Since this is a desktop application, download and install [Node.js](https://nodejs.org) in your machine since it comes with [npm](https://www.npmjs.com/), which is the package manager we are using.

### Setup

To get the app to work, follow the steps below:

```
# Clone this repository
git clone git@github.com:Gonsalo/chat-gpt-app.git

# Go into the repository
cd chat-gpt-app

# Install dependencies
npm install
```

## Usage

To run the application in development mode, use the command:

```
npm run start
```

To package the app:

```
npm run package
```

On the first run, the application will prompt you to choose a location for the application resources. Next, you will fill in your ChatGPT API key in the prompted modal. The application will not proceed without the API key.

Note: Keep your API key confidential! 

Once the initial setup is done, you are good to go! Happy chatting!

## Support

For support, issues, or any questions, please do not hesitate to file an issue and we'll get back to you as soon as possible.

## Contributing

Pull requests are welcome. For changes, please open an issue first to discuss what you'd like to change or improve.

## License

[MIT license](https://opensource.org/licenses/MIT)

Enjoy your AI chat with Chat GPT Desktop App software! 
