import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

export default function Notes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/notes')
            .then(res => res.json())
            .then(data => setNotes(data));
    }, []);

    const handleDelete = async id => {
        await fetch('http://localhost:8000/notes/' + id, {
            method: 'DELETE',
        });

        const newNotes = notes.filter(note => note.id !== id);
        setNotes(newNotes);
    };

    // to make it responsive where leading value is screen size
    const breakPoints = {
        default: 3,
        1100: 2,
        700: 1,
    };

    return (
        <Container>
            <Masonry
                breakpointCols={breakPoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {notes.map(note => (
                    <div key={note.id}>
                        {/* <Paper>{note.title}</Paper> */}
                        <NoteCard note={note} handleDelete={handleDelete} />
                    </div>
                ))}
            </Masonry>
        </Container>
    );
}
