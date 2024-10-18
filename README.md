# Boredom Buster App

A small app designed to help you find random fun activities to do when you're bored. You can select the number of participants, and the app will suggest an activity that fits your chosen group size!

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Random Activity Suggestions**: Receive suggestions for random activities to keep you entertained.
- **Customizable Participants**: Choose how many participants will join, and the app will provide relevant suggestions.
- **Various Categories**: Activities span across different types, including recreational, educational, social, and more.
- **Simple UI**: Intuitive design makes it easy to find activities quickly.

## Installation

To set up the app locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/boredom-buster-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd boredom-buster-app
    ```
3. Install required dependencies:
    ```bash
    npm install
    ```

4. Run the app:
    ```bash
    npm start
    ```

## Usage

1. Open the app in your browser after starting it locally.
2. Select the number of participants for the activity.
3. Choose a category (e.g., Recreational, Educational, Social, etc.).
4. The app will then suggest a fun activity based on your selections!

## API Reference

This app retrieves activity data from a hosted JSON API.

- **API URL**: `https://retycdev.github.io/bordom_buster-API/db.json`
- **Method**: `GET`
- **Response**: Returns an array of activity objects filtered by type and participant count.

Example activity object:

```json
{
  "type": "recreational",
  "participants": 2,
  "activity": "Play a game of badminton"
}
