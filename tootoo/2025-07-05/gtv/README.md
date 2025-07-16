# github-tree-view README.md


* https://pushme-pullyou.github.io/tootoo-2025/tootoo/2025-06-10/gtv/
* heritage-happenings/heritage-happenings.github.io
* pushme-pullyou/tootoo-2025

## Change Log

### 2025-06-11

#### Clause Sonnet 4

# Create a Modern GitHub Repository File Browser from Scratch

Build a complete web application that displays GitHub repository files in a hierarchical tree view with file content display capabilities.

## Core Requirements

### 1. Basic Structure

Create an HTML page with:

- Adjustable left sidebar ( 20rem width, resizable) for the file tree
- Main content area on the right for displaying file contents
- Responsive design that works on desktop and mobile
- Clean, modern UI with proper spacing and typography

### 2. GitHub API Integration

- Use GitHub's REST API to fetch repository contents
- Handle authentication (optional GitHub token for higher rate limits)
- Support any public GitHub repository via URL parameters or input field
- Implement proper error handling for API failures and rate limiting
- Cache API responses to minimize requests

### 3. File Tree Display

- Display folders and files in a collapsible tree structure using HTML `<details>` elements
- Show appropriate icons for different file types (folder, JS, HTML, CSS, MD, images, etc.)
- Implement nested indentation with visual hierarchy
- Add file metadata (size, last modified date)
- Support lazy loading of folder contents on expansion

### 4. File Content Display

- Load and display file contents when clicked
- Render Markdown files with proper formatting
- Display images with preview capabilities
- Display PDF files in iframes
- Handle binary files appropriately (show download option)


### 5. Search and Navigation

- Add search functionality to filter files by name
- Implement breadcrumb navigation showing current path
- Support keyboard navigation (arrow keys, Enter to open)
- Add "Go to file" quick search (Ctrl+P functionality)
- Remember expanded folder states in localStorage

### 6. Advanced Features

- URL routing with hash-based navigation to share direct links to files
- File content caching for better performance
- Loading states and progress indicators
- Copy file URL/raw URL functionality
- Download individual files or entire folders
- View file history/blame information

## Technical Implementation

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Repository Browser</title>
    <!-- Include CSS and external libraries -->
</head>
<body>
    <div class="app-container">
        <aside class="file-tree-sidebar">
            <div class="repo-input">
                <!-- Repository URL input -->
            </div>
            <div class="search-box">
                <!-- File search input -->
            </div>
            <div class="file-tree">
                <!-- Dynamic file tree content -->
            </div>
        </aside>
        <main class="content-area">
            <div class="breadcrumb">
                <!-- Navigation breadcrumbs -->
            </div>
            <div class="file-content">
                <!-- File content display -->
            </div>
        </main>
    </div>
</body>
</html>
```

### 2025-05-29

Prompt:

if a details tag summary with the title "date-samples" contains "file-container" items with names that start with year-month-day, then sort the files in that "folder" with the newest first.

Worked

## 2025-05-19 a

* dd remove location.hash button < done
