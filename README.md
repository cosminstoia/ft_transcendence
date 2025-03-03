# Repository Branch Guidelines

This repository follows a structured branching model to ensure a clean, organized development process for both the frontend and backend teams.

## Branch Overview

- **main**:  
  This branch is for the final product only. **Do not merge into `main` until you have completed the basic tasks for either the frontend or backend.**

- **frontend**:  
  This is the default branch for the frontend team. All frontend-related work should start from this branch.

- **backend**:  
  This is the default branch for the backend team. All backend-related work should start from this branch.

## Development Workflow

1. **Create Feature Branches:**  
   Always create a new branch from either the `frontend` or `backend` branch, depending on your area of work. For example:
   - For a new UI feature, branch off from `frontend`.
   - For a new API endpoint, branch off from `backend`.

2. **Complete Basic Tasks First:**  
   Ensure that the basic tasks for either the frontend or backend are complete before merging any changes into the `main` branch.

3. **Pull Request Process:**  
   Use pull requests to merge changes back into your respective default branch (`frontend` or `backend`). Once basic functionalities are confirmed and stable, a coordinated merge into `main` can occur.

## Visual Diagram

Below is a visual representation of our branching strategy:

```plaintext
           main
          /    \
   frontend    backend
       |           |
 feature/branch  feature/branch
 ```

- main: Contains the stable, final product.
- frontend/backend: Serve as the bases for ongoing development.
- feature branches: Created from frontend or backend for specific tasks.

## Summary
- Do not merge directly into main unless all the basic tasks for the corresponding team (frontend or backend) are complete.
- Always branch off from frontend or backend when adding new code.
- Follow a proper pull request process and ensure code reviews are conducted before merging changes.
By following these guidelines, we maintain a clear separation between development work and the final production-ready code in the main branch.
Feel free to adjust any sections to better fit your team’s workflow.
