import React, { useEffect, useState } from "react";
import {getFirestore, updateDoc, doc} from 'firebase/firestore';
import { app } from "../firebase";
import './Styles.css';

const firestore = getFirestore(app);


const Subjects = ({notes, setArrayNotes, email, userData}) => {
    const [valorInput, setValorInput] = useState();

    async function handleSuprmir (id) {
        id.note.pop();

        const newNote = notes;
        
        console.log(newNote, id);
        const docuRef = doc(firestore,`users/${email}`);
        
        await updateDoc(docuRef, {Ressources: [...newNote]});
        await setArrayNotes(newNote);
    }
    
    async function handleEdit(e) {
        e.preventDefault();
        console.log(e)
        console.log(e.nativeEvent.path[2].childNodes[0].data);

        if(isNaN(valorInput)) {return console.log(null);}
        else {
            let index;
            for (const key in notes) {
                if(notes[key].id === Number(e.nativeEvent.path[2].childNodes[0].data)) index = key;
            }
            
            notes[index].note.push(Number(valorInput))
            const newNote = notes;
    
            const docuRef = doc(firestore,`users/${email}`);
            await updateDoc(docuRef, {Ressources: [...newNote]});
            await setArrayNotes(newNote);
        }
        e.nativeEvent.path[0][0].value = '';
       
    }
    
    async function handleChange(val) {
        val.preventDefault();
        setValorInput(val.target.value);
    }

    useEffect(() => {
        async function fetchNotes() {
          const notesFetched = await userData(email);
          setArrayNotes(notesFetched);
        }
        fetchNotes();
        
    }, [notes]);

    return (
        <div id="divSubjects">
            
            {notes.map((subj) => {
                return (
                    <span key={subj.id}>
                        <h2>{subj.id}</h2>
                        <h3> {subj.subj}</h3>
                        
                        <div>
                            {subj.note.map((nota) => {
                                return (
                                <input key={subj.id.note} type='text' name="notes" value={nota} disabled />
                            )})}
                            <form onSubmit={handleEdit}>
                                <input type='text' name="notesAdd" id="inputadd" onChange={ handleChange} />
                                <button type="submit" className='bg-blue-400'>Add
                                </button>
                            </form>
                            <button onClick={() => handleSuprmir(subj)} className='bg-red-400'>Suprimir
                            </button>
                            
                        </div>
                    </span>
                )
            })}
            
        </div>
    )
}

export default Subjects;
