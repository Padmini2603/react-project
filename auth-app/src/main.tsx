
import { AuthActionResponse, AuthProvider, CheckResponse, OnErrorResponse, Refine } from '@refinedev/core';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


const authProvider: AuthProvider = {
  login: async ({ email, password }: { email: string; password: string; }): Promise<AuthActionResponse> => {
    console.log("Login Data:", { email, password });
    const isLoginSuccessful = true; 

    if (isLoginSuccessful) {
      return Promise.resolve({ success: true });
    } else {
      return Promise.resolve({ success: false }); 
    }
  },
  logout: async (): Promise<AuthActionResponse> => {
    console.log("Logout");
    return Promise.resolve({ success: true }); 
  },
  getPermissions: async () => {
    return Promise.resolve();
  },
  getIdentity: async () => {
    return Promise.resolve();
  },
  onError: async (error: any): Promise<OnErrorResponse> => {
    console.error(error);
    return Promise.resolve({ error: new Error('An error occurred') });
  },
  check: function (params?: any): Promise<CheckResponse> {
    throw new Error('Function not implemented.');
  }
};

const AppWrapper = () => {
    return (
        <Refine authProvider={authProvider} resources={[]}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Refine>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<AppWrapper />);
