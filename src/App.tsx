import { TodoList } from './features/todo/TodoList';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <TodoList />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
