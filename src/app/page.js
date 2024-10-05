import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <main>
      <Provider store={store}>
        hi
        <Toaster />
      </Provider>
    </main>
  );
}
