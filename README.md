# My Pokedex App
Application that allows the user to list, search, and filter pokémon (obtaining the data from https://pokeapi.co/),
and create a custom Pokédex where you can list, add, delete, and mark your pokémon as favorites.


---


## Monorepo description
The application has a monorepo structure with two main projects: **API** and **UI**.  
The packaging and building of the project is done through Turborepo (https://turbo.build/) and Vite (https://vite.dev/).  
In the root folder of the application, we can find a **package.json** file in which the workspaces are specified and the
**Turborepo configuration file** (turbo.json), in which the common tasks for both projects have been configured.  
Each project has its own **package.json**, where the project name is configured **to share the namespace** and
the dependencies for both development and production.  
The UI project has a dependency on the library exposed by the API project.  
There is **only one node_modules folder** at the root of the application where the dependencies of both projects are located.


---


## How to run the project in local

```
npm install

npm run build --workspace api
or
npm run build

npm run dev --workspace ui
or
npm run dev

```


---


## Useful scripts
There are several scripts we can use to run, compile, serve the application, etc.  
Using **Turborepo**, we can run common scripts from the root directory so that they execute in both projects,
although we always have the option to run the scripts by specifying the workspace (--workspace <workspace_name>) we want
to target, or launch the script directly from the project folder so that it only affects that specific project.

- **Build** the projects:  
This script compile and builds the distribution folder for each project.  

```
npm run build
```

- Run in **Dev**:  
This script runs the projects in a development server with hot reloading.  
Every time the code changes the server is updated.
```
npm run dev
```

- **Lint**ing:  
This script reviews the code looking for errors or suspicious code.

```
npm run lint
```

- Unit **Test**ing:  
This script executes the Unit Testing for each project.

```
npm run test
```

- **Start** the build preview:  
This script runs the built version of the application.

```
npm start
```

*Note*: We can use the parameter **--workspace <workspace_name>** to execute the script in the specified project only.  
e.g.
```
npm run build --workspace api
```

### API Only scripts
- **Build** and **Watch**:    
This script allows compiling the API every time a change is made in the code.  
Since the API is a dependency of the UI project, this script allows us to have the
latest updated version of the API while developing the UI

```
npm run build:watch
```

### UI Only scripts
- *Prepare* CSS:  
This script will run Panda CSS CLI codegen before each build, to ensure that the panda output directory is generated.

```
npm run prepare
```


---


## The API project
The API project is not a real API but a class-based project that persists information in the browser storage.  
Although it is not a real API, it has been developed taking into account the separation of concerns in layers, and
common main patterns found in any API.

**NOTE**: The API project stores information in the browser's **IndexedDB** database.  
Although the UI project has a **service worker** capable of storing external requests in the browser's cache, repositories
have been implemented that allow this same information to be stored in the database as an alternative to the cache.

Inside the source folder (*/src*) we can find:

- **Config**: Folder with the modules used to configure the project.

  - *IoC.ts*: Module used to manage the Inversion of Control (IoC) through Dependency Injection (DI) of the project.


- **Entities**: Folder that contains the main models/entities of the project.

  - *Pokemon.ts*
  - *PokemonDetails.ts*
  - *User.ts*


- **Interfaces**: Contains the project abstractions and contracts with the UI.

  - *IAuth.interactor.ts*
  - *IPokedex.interactor.ts*
  - *IPokedex.repository.ts*
  - *IPokemon.interactor.ts*
  - *IPokemon.repository.ts*
  - *IRouter.ts*
  - *IStorage.service.ts*
  - *IUoW.ts*
  - *IUser.repository.ts*
  - *IPokemonRequest.ts*
  - *IUserRequest.ts*
  - *IUserResponse.ts*


- **apiFetch**: Main library and the entry point of the API. This entry point simulates a real fetch and uses a path
  to determine which controller and method should be used.

- *lib/apiFetch.ts*


- **Routes**: It acts as a router to direct the request to the appropriate controller.

  - *auth.routes.ts*
  - *pokedex.routes.ts*
  - *pokemon.routes.ts*


- **Controllers**: Used to manage the entry point's requests and responses

  - *auth.controller.ts*
  - *pokedex.controller.ts*
  - *pokemon.controller.ts*


- **Interactors**: This class-based components contains the business logic.

  - *auth.interactor.ts*: Business logic regarding authentication.
  - *pokedex.interactor.ts*: Business logic regarding pokedex CRUD operations and favorites features.
  - *pokemon.interactor.ts*: Business logic regarding pokémon entity CRUD operations. 


- **Repositories**: This class-based components contains all the logic to add, get or delete the data from local storage.
  The project also uses a simplified Unit of Work (UoW) pattern to centralize the repositories access.

  - *pokedex.repository.ts*
  - *pokemon.repository.ts*
  - *user.repository.ts*


- **Services**: Class-based component that contains the logic to abstract Third-Party services, in our case the abstraction
  of the browser storage. Uses *Ionic Storage* under the hood.

  - *browserStorage.service.ts*


- **Utils**: Different modules that provide helper methods regarding error handling, security, etc.

  - *error.ts*
  - *response.ts*
  - *security.ts*


**NOTE**: The API project is a dependency of the UI project.


---


## The UI project
The UI is an **Ionic React** project managed under the hood by Vite (https://vite.dev/).  
The styling is generated by PandaCSS (https://panda-css.com/).  
It uses the **Context API** to manage the global state, and PWA technologies such as *service worker* to work offline and cache
the external requests.  
The project includes techniques like **code splitting** to break the code into chunks, and **Lazy Load** to improve performance
and only load the pages when the user request them.  
All the Pokémon information is retrieved using the PokéApi (https://pokeapi.co/).  

**NOTE**: The UI project use both, the browser cache and IndexedDB (through API project dependency) to store and retrieve information.  

### The Header
The header of a page is the main component that allows the user to execute an action or navigate.  
Depending on the page the options available to the user can change.  
Following are listed the main options and features included in the header:

- *Network status*: Component that renders a small dot indicating whether the network connection is enabled (green) or disabled (rojo).  
  It allows the user to know if the application is running in online or offline mode.

- *Title* of the page.

- *Navigate To pokedex* icon: An icon similar to a Pokeball that allows the user to navigate to the Pokédex page.

- *Magnifying glass* icon: Allows the user to search a Pokémon in the list by name. The list is sorted by name alphabetically.
  The search feature also works if the list is filtered.

- *Three vertical lines* icon: This option allows the user to filter the pokemons by type (normal, fighting, flaying, poison, etc.)
  If a filter is applied, the filter icon changes and can be canceled, showing the default list of pokemons. 

- *Box with an arrow pointing to the right* icon: This option allows the user to logout.

- *Four boxes in a grid* icon: Allows the user to navigate to the Pokémon List page.

- *Circle with a plus sign* icon: Allows the user to add a Pokémon to the custom Pokedex.

- *Circle with a minus sign* icon: Allows the user to remove a Pokémon from the custom Pokedex.

- *Outlined heart* icon: Allows the user to mark a Pokémon as favorite.

- *Filled heart* icon: Allows the user to unmark a Pokémon as favorite.


### Pages
The application is composed by 5 pages that includes different features.  
The main features of each page are described below.

#### Sign In
This is the fist page the user sees when the application opens.  
Allows the user to access the application using a previously created account, introducing an email address and password.  
If the account does not exist a message is shown to inform the user.  
The user can click the link **Need an account** to navigate to the Sign-Up page and create an account.

#### Sign Up
This page allows the user to create an account, introducing an email address and a password.  
If the email address is already in use or the password has less than 5 characters, a message is displayed to inform the 
user about the problem.
If the user has an account, can click the link **Already a user?** to navigate to the Sign-In page.

#### Pokemon List / Gallery
*This page is protected with authentication access; if the user is not identified cannot access it.*  
Once the user has identified themselves, they will access this page as the homepage.  
This page displays an indexed list of Pokémon from Pokémon number 1 to 20 at the start, although thanks to the 
*infinite scroll* implemented on the page, more Pokémon will be loaded paginated in batches of 20 (by default), as the
user keeps scrolling.  

Every **Pokémon card** in the list is a link to the Pokémon details page, so the user can click on a card to access the
selected Pokémon details page.

The header on this page includes the following options and features:

- Network Status.
- Navigate to Pokedex.
- Search a Pokémon by name.
- Filter Pokémons by type.
- Logout.

#### Pokemon Details
*This page is protected with authentication access; if the user is not identified cannot access it.*  
When a user clicks on a *Pokémon Card* in the Pokémon List page this page opens.  
Here the user can see the details of a selected Pokémon:  
- Pokémon Id
- Pokémon Image
- Name
- Types
- Base experience
- Height
- Weight
- Stats
- Abilities

The header on this page includes the following options and features:  

- Navigate to Previous page
- Navigate to Pokedex
- Add / remove Pokémon to/from Pokédex
- Mark / unmark Pokémon as favorite

**NOTE**: If a Pokémon is included in the user Pokédex the **Pokémon Id** is highlighted in yellow.

#### Pokedex
*This page is protected with authentication access; if the user is not identified cannot access it.*  
A user can access this page using the header option to navigate to the Pokédex page, from the Pokémon List or Pokémon Details page. 
In this page a user can see the Pokémons added to his/her Pokédex. Other users cannot access this Pokédex, is private.
This page shows a list of **Pokémon Cards** with the following information:

- Pokémon Id
- Name
- Types
- Pokémon Image

Every Pokémon Card has two options:
1. Mark / unmark the selected Pokémon as favorite.
2. Remove the selected Pókemon from the Pokédex.

---

## Testing
### Testing the Api project (it's a class-base demo not a real API)
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
WIP

---


## Deployment
The project is prepared to be deployed in Netlify (https://www.netlify.com/).
Inside the public folder a **netlify.toml** file can be found, with the configuration needed to deploy a PWA application.

### Steps to deploy
1. Upload the code to a github repository
2. Create or access to a Netlify account
3. Under the **Sites** menu option click on **Add new site**
4. Click on **Import an existing project**
5. Select **GitHub**
6. Select the project repository to be deployed
7. Configure the build setting, in our case:
   1. Branch: **Main**
   2. Site to deploy: **UI**
   3. Build Command:
      ```
      turbo run build --filter @my-pokedex-app/ui
      or
      npm run build --workspace ui
      ```
   4. Public directory: **ui/dist**
8. Click on **Deploy** 

**NOTE**: Every time we make a change in the branch deployed, the deployment will be updated.  
