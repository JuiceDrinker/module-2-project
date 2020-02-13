# CocktailMe (C) 2020

<br>

## Description

Dont know what to drink tonight? We'll tell you!

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of drink, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add favorite drinks to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.

<br>

## API Routes (Back-end):

| **Method** | **Route**                     | **Description**                                                          | Request - Body                  |
| ---------- | ----------------------------- | ------------------------------------------------------------------------ | ------------------------------- |
| `GET`      | `/`                           | Main page route. Renders home `index` view.                              |                                 |
| `GET`      | `/auth/login`                 | Renders `login` form view.                                               |                                 |
| `POST`     | `/auth/login`                 | Sends Login form data to the server.                                     | { email, password }             |
| `GET`      | `/auth/signup`                | Renders `signup` form view, if already logged in redirect to '/'         |                                 |
| `POST`     | `/signup`                     | Sends Sign Up info to the server and creates user in the DB.             | { email, password }             |
| `GET`      | `/private/profile`            | Private route. Renders `edit-profile` form view.                         |                                 |
| `PUT`      | `/private/profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [imageUrl] } |
| `GET`      | `/private/favorites`          | Private route. Render the `favorites` view.                              |                                 |
| `POST`     | `/private/favorites/`         | Private route. Adds a new favorite for the current user.                 | { userID, drinkID }             |
| `DELETE`   | `/private/favorites/:drinkID` | Private route. Deletes the existing favorite from the current user.      |                                 |
| `GET`      | `/random-drink`               | Renders `random-drink` view.                                             |                                 |
| `GET`      | `/add-drink`                  | Renders `add-drink` view                                                 |                                 |
| `POST`     | `/add-drink`                  | Adds a drink to the user/global database depending on user wishes        |                                 |
| `GET`      | `/drink/:id`                  | Renders `random-drink` view.                                             |                                 |
| `PUT`      | `/drink/:id`                  | Renders `random-drink` view.                                             |                                 |

## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [drinkId],
  notes: [ {drinkId, String} ],
  terms: true/false,
  newsletter: true/false,
}

```

Drink model

```javascript
{
  name: String,
  ingridients: [ {ingridientId, unit, amount, label} ,{special} ],
  alcohol: true/false,
  category: String,
  garnish: String,
  preparation: String,
}

```

Ingridient model

```javascript
{
  name: String,
}

```

<br>

## Backlog

[See the Trello board.](https://trello.com/b/DJ6K5C6p/cocktailme)

<br>

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/JuiceDrinker/module-2-project)

[Deploy Link]()

<br>

### Slides

The url to your presentation slides

[Slides Link]()
