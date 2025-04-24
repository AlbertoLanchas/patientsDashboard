import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

import { PatientsPage } from "../views/PatientsPage";

const server = setupServer(
    http.get('/patients', () => {
        return new HttpResponse(null, { status: 500 });
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const queryClient = new QueryClient();

describe("PatientsPage", () => {

    test("should render loading state", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <PatientsPage />
            </QueryClientProvider>
        );

        expect(screen.getByText(/Loading patients.../i)).toBeInTheDocument();
    });
});