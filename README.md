# My Pokedex App

## Monorepo description


## Useful scripts


## Testing
### Testing the Api project (it's a demo not a real API)
The Vitest library has been used for the creation and execution of unit tests.

The tests are located in the same folder as the source code to be tested, using the same file name but with the suffix **.test**.*

For example the unit tests for the file **security.ts** can be found in **security.test.ts**.

The script used to execute the unit test:
```
npm run test.unit
```
#### Unit tests
Several unit tests have been created as a sample for the API project, both for synchronous and asynchronous functionality.
Thanks to the strategy pattern and Dependency Injection (DI) used in the creation of the project to implement Inversion of Control (IoC), it is very easy to test the different parts of the API and use mocks when necessary.

- Controllers
- Interactors
- Libs
  - apiFetch.test.ts
- Repositories
- Utils
  - error.test.ts
  - response.test.ts
  - security.test.ts

### Testing the UI
