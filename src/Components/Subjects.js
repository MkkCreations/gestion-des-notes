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
                if(notes[key].id === Number(e.nativeEvent.path[2].childNodes[0].innerHTML)) index = key;
            }
            console.log(notes[index]);
            notes[index].note.push(Number(valorInput));
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
    
    let ue31 = 0;
    let ue32 = 0;
    let ue33 = 0;
    let ue34 = 0;
    let ue35 = 0;
    let ue36 = 0;
    async function calcul() {
        
        for (const key in notes) {
            if (notes[key].coef31) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue31 += notes[key].coef31 * notes[key].note[i];
                    
                }
            }
            if (notes[key].coef32) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue32 += notes[key].coef32 * notes[key].note[i];
                    
                }
            }
            if (notes[key].coef33) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue33 += notes[key].coef33 * notes[key].note[i];
                    
                }
            }
            if (notes[key].coef34) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue34 += notes[key].coef34 * notes[key].note[i];
                    
                }
            }
            if (notes[key].coef35) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue35 += notes[key].coef35 * notes[key].note[i];
                    
                }
            }
            if (notes[key].coef36) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue36 += notes[key].coef36 * notes[key].note[i];
                    
                }
            }
            
        }
        ue31 = (ue31/100).toFixed(2);
        ue32 = (ue32/100).toFixed(2);
        ue33 = (ue33/100).toFixed(2);
        ue34 = (ue34/100).toFixed(2);
        ue35 = (ue35/100).toFixed(2);
        ue36 = (ue36/100).toFixed(2);
        
    }
    

    useEffect(() => {
        async function fetchNotes() {
          const notesFetched = await userData(email);
          setArrayNotes(notesFetched);
        }
        fetchNotes();
    }, [notes, calcul()]);

    return (
        <div id="divSubjects">
            <div>
                <div style={{backgroundColor: ue31>=6? 'green': '#b51a1a'}}><p>UE 3.1:</p> {ue31} /12</div>
                <div style={{backgroundColor: ue32>=6? 'green': '#b51a1a'}}><p>UE 3.2:</p> {ue32} /12</div>
                <div style={{backgroundColor: ue33>=6? 'green': '#b51a1a'}}><p>UE 3.3:</p> {ue33} /12</div>
                <div style={{backgroundColor: ue34>=6? 'green': '#b51a1a'}}><p>UE 3.4:</p> {ue34} /12</div>
                <div style={{backgroundColor: ue35>=6? 'green': '#b51a1a'}}><p>UE 3.5:</p> {ue35} /12</div>
                <div style={{backgroundColor: ue36>=6? 'green': '#b51a1a'}}><p>UE 3.6:</p> {ue36} /12</div>
            </div>
            
            {notes.map((subj) => {
                return (
                    <span>
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
