const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function getTodos() {
  const response = await fetch(API_BASE_URL);
  return await response.json();
}

export async function createTodo(title: string) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed: false }),
  });
  return await response.json();
}
