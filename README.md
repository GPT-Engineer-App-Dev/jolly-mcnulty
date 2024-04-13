# jolly-mcnulty

Implement a CSV upload and processing tool with the following features:

- A form with a file input for uploading a CSV file 
- When a file is uploaded, read the CSV data and robustly parse it into an array of objects, gracefully handling any formatting inconsistencies
- Filter the data to only include rows where type is "ai_update"
- Add a dropdown to select a project ID. When a project is selected, show a filtered view with only the edits for that project, ordered by creation date
- For each edit, display:
  - The edit ID
  - The commit SHA 
  - A link to search GitHub for that commit in the format: https://github.com/search?q=commit%3A{commit_sha}&amp;amp;type=commits
  - The parsed contents of the tags.output field. Gracefully handle any JSON formatting issues in this field.
- Use Chakra UI components to create a polished and intuitive user interface

Some key things to keep in mind:
- Be meticulous in parsing the CSV data. It needs to be rock solid and handle any edge cases or inconsistencies in the file format.
- Carefully filter the data and don't make any assumptions about the fields. Explicitly check for type=ai_update.
- Use a robust JSON parsing library or implement careful error handling when parsing the tags.output field, since its format may not always be perfect.
- Prioritize code clarity and add comments explaining any complex parsing or filtering logic.
- Make the UI as intuitive as possible, with clear labeling and sensible layout of the dropdowns, edit list, and edit details.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with REPLACE_WITH_TECH_STACK_SUMMARY.

REPLACE_WITH_TECH_STACK_POINTS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App-Dev/jolly-mcnulty.git
cd jolly-mcnulty
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
