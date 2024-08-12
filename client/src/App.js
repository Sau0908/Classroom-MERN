import "./App.css";
import { Provider } from "react-redux";
import { store } from "./components/utils/store";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
}

export default App;
