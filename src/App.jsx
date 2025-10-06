import AppRoutes from "./components/AppRoutes";
import AuthProvider from "./context/AuthProvider";
import TransactionProvider from "./context/TransactionProvider";

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
          <AppRoutes />
        </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
