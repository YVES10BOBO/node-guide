// React example that talks to the Express API (http://localhost:5000/students).
// Usage: create a React app (npm create vite@latest frontend -- --template react),
// copy this file into frontend/src/, and in App.jsx do:
//   import StudentsApp from './StudentsApp';
//   export default function App() { return <StudentsApp />; }
import { useEffect, useState } from 'react';

const API = 'http://localhost:5000/students';
const emptyForm = { name: '', gender: 'male', course: '', level: 1 };

export default function StudentsApp() {
    const [students, setStudents] = useState([]); // list shown on screen
    const [form, setForm] = useState(emptyForm);  // inputs of the form
    const [editingId, setEditingId] = useState(null); // null = adding, number = editing
    const [error, setError] = useState('');

    // Purpose: GET all students from the API and store them in state.
    async function loadStudents() {
        try {
            const res = await fetch(API);
            setStudents(await res.json());
        } catch {
            setError('Cannot reach the server. Is it running on port 5000?');
        }
    }

    // Purpose: load the list once, when the component first appears.
    useEffect(() => {
        loadStudents();
    }, []);

    // Purpose: keep the form state in sync with what the user types.
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Purpose: POST (add) or PUT (update) depending on editingId, then refresh the list.
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        const res = await fetch(editingId ? `${API}/${editingId}` : API, {
            method: editingId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, level: Number(form.level) }),
        });
        if (!res.ok) {
            const data = await res.json();
            return setError(data.message);
        }
        setForm(emptyForm);
        setEditingId(null);
        loadStudents();
    }

    // Purpose: fill the form with a student's data so it can be edited.
    function startEdit(student) {
        setEditingId(student.id);
        setForm({
            name: student.name,
            gender: student.gender,
            course: student.course,
            level: student.level,
        });
    }

    // Purpose: DELETE a student by id, then refresh the list.
    async function handleDelete(id) {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        loadStudents();
    }

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h1>Students</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
                <input name="level" type="number" min="1" max="4" value={form.level} onChange={handleChange} required />
                <button type="submit">{editingId ? 'Update student' : 'Add student'}</button>
            </form>

            <ul>
                {students.map((s) => (
                    <li key={s.id}>
                        {s.name} ({s.gender}) - {s.course}, level {s.level}{' '}
                        <button onClick={() => startEdit(s)}>Edit</button>{' '}
                        <button onClick={() => handleDelete(s.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
