import React, { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from '../reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core'
// import CustomPrompt from '@components/installAppPrompt';  // this is for install the web app to the browser


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:1000*60*2, //2 mints
      retry:5,
      retryDelay:1000
    }
  }
});

const store = configureStore({
  reducer: rootReducer
})

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            {children}
            <ToastContainer />
          </MantineProvider>
        </QueryClientProvider>
      </Provider>
    </Router>
  )
}

export default Providers