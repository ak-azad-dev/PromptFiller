# Prompt Placeholder Filler

A sleek and interactive web application designed to dynamically populate placeholders within text prompts. Built with **React.js** and **Ant Design**, this lightweight solution delivers a seamless user experience for creating, customizing, and managing text templates.

## Live Demo 

Please visit https://steady-stroopwafel-a32e72.netlify.app for a live demo. 

## Features

- **Dynamic Placeholders**: Easily define and replace placeholders in text prompts with user inputs `[Placeholder]` or `{Placeholder}` from the entered text.
- **Real-Time Preview**: See your changes instantly with a live preview of the updated text.
- **User-Friendly Interface**: Leverages Ant Design's elegant components for a clean, responsive design.
- **Lightweight and Fast**: Optimized for performance and designed for simplicity.

## Technologies Used

- **Ant Design**: For the structure of the application, styling and responsive design .
- **React.js**: For interactivity and state management.

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/ak-azad-dev/PromptFiller.git
   ```

2. Navigate to the project directory:
   ```bash
   cd PromptFiller
   ```

3. Install all required dependencies by following command:
   ```bash
   npm install
   ```

4. Run the Project by following command:
   ```bash
   npm start
   ```

4. Enter your prompt in the "Past your prompt here" textarea. For example:
   ```
   Greetings, [name]! Thrilled to have you join us on [company].
   ```

5. Fill in the values for the detected placeholders in the generated input fields.

6. Copy the final prompt to your clipboard using the "Copy" button.

## Example

### Input Prompt:
   ```
   Greetings, [name]! Thrilled to have you join us on [company].
   ```

### Placeholder Input:
- `name`: Azad
- `company`: Hajlink

### Final Output:
   ```
   Greetings, Azad! Thrilled to have you join us on Hajlink.
   ```

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to report bugs or suggest new features.

## License

This project is licensed under the MIT License. 

## Acknowledgments

- [Ant Design Documentation](https://ant.design/)
- [React.js Documentation](https://react.dev/learn/)