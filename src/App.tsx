import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { Authenticated, ErrorComponent } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { Home, ForgotPassword, Register, Login, CompanyList } from "./pages";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { dataProvider, liveProvider, authProvider } from "./providers";
import { Layout } from "./components/layout";
import { Resources } from "./config/Resources";
import { CompanyCreate } from "./pages/companies/CompanyCreate";
import { CompanyEdit } from "./pages/companies/CompanyEdit";
import { TasksList } from "./pages/tasks/TaskList";
import { TasksEdit } from "./pages/tasks/TaskEdit";
import { TasksCreate } from "./pages/tasks/TaskCreate";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              resources={Resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "kyRzxu-PGXZuL-JGT3X9",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />

                  <Route
                    path="/tasks"
                    element={
                      <TasksList>
                        <Outlet />
                      </TasksList>
                    }
                  >
                    <Route path="new" element={<TasksCreate />} />
                    <Route path="edit/:id" element={<TasksEdit />} />
                  </Route>

                  <Route path="/companies">
                    <Route index element={<CompanyList />} />
                    <Route path="new" element={<CompanyCreate />} />
                    <Route path="edit/:id" element={<CompanyEdit />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-auth"
                      fallback={<Outlet />}
                    ></Authenticated>
                  }
                ></Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
