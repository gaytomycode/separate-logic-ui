# Bloc pattern inspired react/redux/query archicture

![Meme of Bart Simpson](bart.png)

Creating a frontend architecture that takes inspiration from Bloc pattern using React, Redux and Query. This architecture aims to isolate the business logic from the presentation layer, ensuring a clear separation of concerns between the two. By doing so, the business logic becomes highly reusable and can be easily shared across the application.

One of the key benefits of this approach is that the business logic can be moved into its own library, making it compatible with both React and React Native applications. This means that developers can implement the same business logic in both web and mobile applications, while only needing to create UI components specific to each platform.

This architecture promotes clean, maintainable code and allows for greater flexibility when developing frontend applications. By following this design pattern, developers can efficiently build and scale their applications while minimizing code duplication and maximizing code reusability.

---

The example provided is a simple Todo application built using React, Redux, and TypeScript.

## Architecture Overview

The architecture focuses on clean code principles and separation of concerns. The code is organized into the following layers:

* Presentation Layer: React components used to render the UI and handle user interactions.
* Business Logic Layer: Redux state management, including actions and reducers, to handle application state and logic.
* Data Layer: API functions to interact with external data sources.

## Code Examples

### Presentation Layer

The presentation layer is built using React components. Here's an snippet of the TodoList.tsx file:

```tsx
import { setTodos, addTodo, selectTodos } from './todoSlice';
import { getTodos, createTodo } from '../../api/todoApi';

export function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  useQuery('todos', getTodos, {
    onSuccess: (data) => dispatch(setTodos(data)),
  });

  const mutation = useMutation(createTodo, {
    onSuccess: (data) => {
      dispatch(addTodo(data));
    },
  });

  const handleAddTodo = async () => {
    const title = prompt('Enter todo title:');
    if (title) {
      await mutation.mutateAsync(title);
    }
  };

  return (
        <button
          type="button"
          onClick={handleAddTodo}
        >
          Add todo
        </button>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                  <div>{todo.title}</div>
              </td>
            </tr>
          ))}
        </tbody>
  );
}
```

### Business Logic Layer

The business logic layer uses Redux to manage the application state. The store.ts file configures the Redux store with the necessary reducers:

```ts
import todoReducer from './features/todo/todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
```

The todoSlice.ts file defines the state, actions, and reducers for the Todo feature:

```ts
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
  },
});

export const { setTodos, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

### Data Layer

The data layer consists of API functions that interact with external data sources. In this example, the api.ts file contains functions to fetch and create todos:

```ts
export async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  return await response.json();
}

export async function createTodo(title: string) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed: false }),
  });
  return await response.json();
}
```

By following these clean code principles and separating concerns, the codebase becomes more maintainable and modular.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the `LICENSE.md` file for full license text.
