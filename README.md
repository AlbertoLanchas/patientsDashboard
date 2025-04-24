# 🏥 Patients Management App

A simple and modern patient management application built with **React**, **TypeScript**, and **TanStack Query**.  
It provides a clean interface to view, search, add, edit, and delete patient records with optimized performance and developer experience.

---

## ✨ Overview

This project was created as a technical challenge to explore the **TanStack ecosystem**, with a focus on modular code structure, maintainability, and future extensibility.

---

## 📸 Demo

![App Screenshot](./screenshots/demo.png)  
> _You can include a GIF or video demo here._

---


## 🧪 Testing Strategy

Testing is still in development, with a full implementation available on the **`extra-features`** branch. The goal is to implement the app with a **Test-Driven Development (TDD)** approach to ensure robustness and prevent regressions.


### 1. **What testing strategy would you implement to prevent regressions?**

To prevent regressions, I would implement a **Test-Driven Development (TDD)** strategy. The approach would focus on writing tests before implementing new features, ensuring that each feature is covered from the start. In addition to TDD, **continuous integration (CI)** tools would be set up to run all tests automatically on every commit, ensuring that no new changes introduce any regressions. I would also prioritize the following steps to prevent regressions:

- **Unit Testing**: Ensure that individual components and functions work as expected in isolation.
- **Integration Testing**: Test how components interact with each other (e.g., form submissions, data fetching).
- **End-to-End Testing**: Verify that the entire app works as expected, simulating user flows.
- **Test Coverage**: Maintain high test coverage, but focus on testing **critical paths** of the app (e.g., patient fetching, form submission).

By combining these layers of testing with **CI/CD** pipelines, we can ensure that the app remains stable and free from regressions as new features and changes are made.

---

### 2. **Which components or features would you prioritize for testing and why?**

To prioritize tests, I would consider two factors: **functional impact** (what breaks the app if it fails?) and **technical complexity** (what is more likely to introduce errors?). Based on this, I prioritize testing the following components and features:

1. **Patient Fetching (React Query)**  
   - **Why?** This is the core of the app. If patient data cannot be fetched, the entire functionality of the app breaks down. This feature should be tested first to ensure proper data fetching, loading, and error handling.
   
2. **Patient Search**  
   - **Why?** The search functionality is crucial for user experience. If it breaks, the app becomes significantly less usable, as users rely on it to find specific patients quickly.
   
3. **Viewing Patient Notes**  
   - **Why?** This feature is central to the user's workflow. Healthcare providers or coaches depend on patient notes, so ensuring this component functions correctly is vital.
   
4. **Forms (Create/Edit Patients & Notes)**  
   - **Why?** While important, forms are more isolated in terms of functionality. However, they're still prone to errors, especially in validation and state management.
   
5. **Delete Patient or Notes**  
   - **Why?** While deleting is less frequent and less impactful if it fails, it should still be tested to avoid accidental data loss or incorrect operations. This feature is lower priority but still necessary.

This approach ensures that **critical app features** (like data fetching and patient viewing) are tested first, followed by less critical but important functionality (like forms and deletion). The priority order helps us catch functional issues early while addressing complexity in a structured manner.

---

### 3. **What testing tools or libraries would you use with this stack?**

The following testing tools and libraries would be used in combination to cover all aspects of the app:

- **React Testing Library (RTL)** & **Jest** for Component Tests  
  - **Use Case**: Testing individual components such as forms, lists, and UI behaviors (inputs, validation, etc.).
  - **Why?** RTL is designed to test components from the user's perspective, which is essential for React apps. Jest will drive the tests, handle assertions, and mock dependencies. It is ideal for unit and integration testing.
  
- **TanStack Query Testing Library** for Data-Layer Hooks  
  - **Use Case**: Testing **useQuery** and **useMutation** hooks to ensure correct data fetching and mutations without needing a backend.
  - **Why?** Since the app relies on TanStack Query for managing server data, this tool ensures that queries and mutations are tested for success, error, and loading states. This prevents potential issues in the data layer from going unnoticed.  
  - [TanStack Query Testing Library](https://tanstack.com/query/latest)

- **Mock Service Worker (MSW)** for API Mocking  
  - **Use Case**: Mocking the API layer for testing scenarios where we simulate real-world API responses (e.g., successful fetches or API failures).
  - **Why?** MSW intercepts network requests and provides a controlled environment for mocking API responses. This allows us to test the app's behavior without needing a real backend, making tests faster and more reliable.  
  - [Mock Service Worker](https://mswjs.io/)

- **Playwright** for End-to-End Testing  
  - **Use Case**: Full-app scenario testing, like adding a patient, searching for patients, or viewing their notes.
  - **Why?** Playwright allows us to test the entire user journey in a real browser, providing confidence that the app will work correctly in production. It helps identify integration issues, routing problems, and unanticipated bugs.  
  - [Playwright](https://playwright.dev/)

---

### 🔄 **Why This Mix?**

- **RTL + Jest** cover the components and hooks efficiently and reliably.
- **TanStack Query Testing Library** ensures that all data-fetching and mutation logic works as expected.
- **MSW** provides a robust and consistent approach to mocking APIs, ensuring the tests remain stable and predictable.
- **Playwright** adds an additional layer of confidence by validating the user journey in a real browser environment, catching issues that only occur during actual user interactions.

This mix of tools provides full-stack coverage—unit, integration, and end-to-end—ensuring that the application is robust, well-tested, and regression-free as it evolves.

## 🚀 Features

- 📋 **Patient Listing**: View all patients in a dynamic, searchable table.
- ➕ **Add Patient**: Register new patients using a modal form.
- ✏️ **Edit Patient**: Modify patient information with real-time updates.
- 🗑️ **Delete Patient**: Confirm and safely delete records.
- 🔍 **Search**: Live filtering of patients by name.
- 🔄 **Optimistic Updates**: Enhance UX with instant UI feedback.
- 🧠 **State Management**: Powered by React Query.
- 💾 **Local Persistence**: Simulated storage with `localStorage`.
- 🌐 **Router Integration**: Built using **TanStack Router** for modern navigation.
- 🧪 **Testing Suite**: Tests built with React Testing Library and MSW.
- ⚙️ **Code Quality Tools**: Formatting & linting with Biome.

---

## ⚙️ Tech Stack

| Category         | Tech                          |
|------------------|-------------------------------|
| Framework        | [React](https://reactjs.org/) |
| Language         | [TypeScript](https://www.typescriptlang.org/) |
| State/Data       | [TanStack Query](https://tanstack.com/query/latest) |
| Routing          | [TanStack Router](https://tanstack.com/router) |
| Styling          | [Tailwind CSS](https://tailwindcss.com/) |
| Testing          | [React Testing Library](https://testing-library.com/), [MSW](https://mswjs.io/) |
| Formatting       | [Biome](https://biomejs.dev/) |
| Forms & Hooks    | [React Hook Form](https://react-hook-form.com/) |

---

## 💡 Why This Stack?

🔬 **TanStack Query**: The core of this app’s data management and API calls, **TanStack Query** helped streamline data fetching, caching, and synchronization. It allows handling complex state and requests effortlessly by offering features like automatic retries, background refetching, pagination, and real-time updates. Using it with **React** significantly reduced boilerplate code and led to a more declarative and maintainable architecture.

⚡ **Performance & Simplicity**: Biome was chosen as a modern replacement for Prettier + ESLint, offering better performance and unified tooling.

---

## 📦 Installation

```bash
https://github.com/AlbertoLanchas/patientsDashboard.git
cd patients-app
npm install
npm run dev
