import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
const TodoApp: React.FC = () => {
  const { auth, logout } = useAuth();
  if (!auth) {
    return <Login />;
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
            <p className="text-gray-600">Welcome back, !</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <TodoList />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <AuthProvider>
        <TodoApp />
      </AuthProvider>
      ;
    </>
  );
};

export default App;
