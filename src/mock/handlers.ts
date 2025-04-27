import { http, HttpResponse, delay } from "msw";
import { db } from "./data";
import { v4 as uuid } from "uuid";
import { Patient, Gender } from "../interfaces";
import { Note } from "../pages/PatientsDetail/interface/KPIModal";

export const handlers = [
  // GET /patients
  http.get('/api/patients', async ({ request }) => {
    await delay(500);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

    const genderParam = url.searchParams.get('gender');
    const primaryConditionsParam = url.searchParams.getAll('primaryCondition');
    const minAgeParam = url.searchParams.get('minAge');
    const maxAgeParam = url.searchParams.get('maxAge');

    let filtered = db.patients as Patient[];

    if (genderParam && genderParam !== Gender.All) {
      filtered = filtered.filter(p => p.gender === genderParam);
    }

    if (primaryConditionsParam.length > 0) {
      filtered = filtered.filter(p =>
        p.primaryCondition && primaryConditionsParam.includes(p.primaryCondition)
      );
    }

    if (minAgeParam) {
      filtered = filtered.filter(p => p.age >= parseInt(minAgeParam, 10));
    }
    if (maxAgeParam) {
      filtered = filtered.filter(p => p.age <= parseInt(maxAgeParam, 10));
    }

    const totalPatients = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedPatients = filtered.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedPatients,
      total: totalPatients,
      page,
      pageSize,
    }, { status: 200 });
  }),

  // GET /patients/:patientId
  http.get("/api/patients/:patientId", async ({ params }) => {
    await delay(500);
    const patient = db.patients.find((p) => p.id === params.patientId);
    return patient
      ? HttpResponse.json(patient as Patient)
      : new HttpResponse(null, { status: 404 });
  }),

  // POST /patients
  http.post("/api/patients", async ({ request }) => {
    const data = (await request.json()) as Omit<Patient, "id">;
    const newPatient: Patient = { id: uuid(), ...data };
    db.patients.push(newPatient);
    return new HttpResponse(JSON.stringify(newPatient), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // PUT /patients/:patientId
  http.put("/api/patients/:patientId", async ({ params, request }) => {
    const updates = (await request.json()) as Partial<Patient>;
    const index = db.patients.findIndex((p) => p.id === params.patientId);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    db.patients[index] = { ...db.patients[index], ...updates };
    return HttpResponse.json(db.patients[index] as Patient);
  }),

  // DELETE /patients/:patientId
  http.delete("/api/patients/:patientId", async ({ params }) => {
    db.patients = db.patients.filter((p) => p.id !== params.patientId);
    db.notes = db.notes.filter((n) => n.patientId !== params.patientId);
    return new HttpResponse(null, { status: 204 });
  }),

  // GET /patients/:patientId/notes
  http.get("/api/patients/:patientId/notes", async ({ request, params }) => {
    await delay(500);

    const url = new URL(request.url);
    const typeParam = url.searchParams.get('type');
    let filtered = db.notes as Note[];

    if (typeParam) {
      filtered = filtered.filter(n => n.type === typeParam);
    }

    const notes = db.notes.filter((n) => n.patientId === params.patientId);

    return HttpResponse.json(notes as Note[]);
  }),

  // POST /patients/:patientId/notes
  http.post(
    "/api/patients/:patientId/notes/:noteId",
    async ({ params, request }) => {
      const body = (await request.json()) as Omit<Note, "id" | "patientId">;
      const note: Note = {
        id: uuid(),
        patientId: params.patientId as string,
        ...body,
      };
      db.notes.push(note);
      return new HttpResponse(JSON.stringify(note), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    },
  ),

  // PUT /patients/:patientId/notes/:noteId
  http.put(
    "/api/patients/:patientId/notes/:noteId",
    async ({ params, request }) => {
      const updates = (await request.json()) as Partial<Note>;
      const index = db.notes.findIndex((n) => n.id === params.noteId);
      if (index === -1) return new HttpResponse(null, { status: 404 });
      db.notes[index] = { ...db.notes[index], ...updates };
      return HttpResponse.json(db.notes[index] as Note);
    },
  ),

  // DELETE /patients/:patientId/notes/:noteId
  http.delete("/api/patients/:patientId/notes/:noteId", async ({ params }) => {
    db.notes = db.notes.filter((n) => n.id !== params.noteId);
    return new HttpResponse(null, { status: 204 });
  }),
];
