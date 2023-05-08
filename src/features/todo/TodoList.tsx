import { useQuery, useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, addTodo, selectTodos } from './todoSlice';
import { getTodos, createTodo } from '../../api/todoApi';

export function TodoList() {
  const statuses = { 'true': 'text-green-400 bg-green-400/10', 'false': 'text-rose-400 bg-rose-400/10' }
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
  }

  useQuery('todos', getTodos, {
    onSuccess: (data) => dispatch(setTodos(data)),
  });

  const mutation = useMutation(createTodo, {
    onSuccess: (data) => {
      dispatch(addTodo(data));
    },
    // FIXME: Add error handling onError using a general error toast
  });

  const handleAddTodo = async () => {
    const title = prompt('Enter todo title:');
    if (title) {
      await mutation.mutateAsync(title);
    }
  };

  return (
    <div className="bg-gray-900 py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-white">Todos</h1>
            <p className="mt-2 text-sm text-gray-300">
              A list of all todos
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleAddTodo}
            >
              Add todo
            </button>
          </div>
        </div>
      </div>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              Todo
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Completed
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm font-medium leading-6 text-white">{todo.title}</div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <div className={classNames(statuses[todo.completed.toString() as 'true' | 'false'], 'flex-none rounded-full p-1')}>
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="hidden text-white sm:block">{todo.completed ? 'Completed' : 'Not Completed'}</div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
