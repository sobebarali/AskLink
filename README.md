# Link Question App

Link Question App is a web application that provides AI-powered answers to questions about the content of any URL. By leveraging advanced natural language processing capabilities, the app extracts and analyzes content from web pages, allowing users to ask specific questions and receive concise, contextually relevant answers.

## Features

- **AI-Powered Answers**: Get intelligent responses to questions about web content.
- **Source References**: View sources used to generate answers.
- **User-Friendly Interface**: Simple and intuitive design for easy interaction.

## Tech Stack

- **Next.js**: Framework for server-side rendered React applications.
- **React**: Library for building user interfaces.
- **tRPC**: Type-safe API communication.
- **Prisma**: ORM for database management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Langchain & OpenAI**: For AI-driven text processing.
- **Zod**: Schema validation.
- **Vercel**: Deployment platform.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sobebarali/AskLink.git
   cd AskLink
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your environment variables. For example:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Enter a URL in the input field.
2. Type your question about the content of the URL.
3. Submit the form to receive an AI-generated answer with source references.

## Testing

To run tests, use the following command:

```bash
vitest
```

## Deployment

The app is deployed on Vercel. To deploy your own version, connect your repository to Vercel and follow their deployment instructions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [sobebarali@gmail.com](mailto:sobebarali@gmail.com).
