import React, { useEffect, useState } from "react";
import {getFirestore, updateDoc, doc} from 'firebase/firestore';
import { app } from "../firebase";
import './Styles.css';

const firestore = getFirestore(app);


const Subjects = ({notes, setArrayNotes, email}) => {
    const [valorInput, setValorInput] = useState();
    const [notesUE, setNotesUE] = useState([]);
    
    async function handleSuprmir (id) {
        id.note.pop();
        
        const newNote = notes;
        
        console.log(newNote, id);
        const docuRef = doc(firestore,`users/${email}`);
        
        await updateDoc(docuRef, {Ressources: [...newNote]});
        await setArrayNotes(newNote);
        calcul();
    }
    
    async function handleEdit(e) {
        e.preventDefault();
        console.log(e);
        
        if(isNaN(valorInput)) {return console.log(null);}
        else {
            let index;
            for (const key in notes) {
                if(notes[key].id === Number(e.nativeEvent.target[0].value)) index = key;
            }
            console.log(notes[index]);
            notes[index].note.push(Number(valorInput));
            const newNote = notes;
            
            const docuRef = doc(firestore,`users/${email}`);
            await updateDoc(docuRef, {Ressources: [...newNote]});
            await setArrayNotes(newNote);
        }
        e.nativeEvent.path[0][0].value = '';
        calcul();
        
    }
    
    async function handleChange(val) {
        val.preventDefault();
        setValorInput(val.target.value);
    }
    
    async function calcul() {
        let ue31 = 0;
        let ue32 = 0;
        let ue33 = 0;
        let ue34 = 0;
        let ue35 = 0;
        let ue36 = 0;
        
        for (const key in notes) {
            if (notes[key].coef31) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue31 += (notes[key].coef31 * notes[key].note[i])/notes[key].note.length;
                    console.log(ue31);
                }
            }
            if (notes[key].coef32) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue32 += (notes[key].coef32 * notes[key].note[i])/notes[key].note.length;
                    
                }
            }
            if (notes[key].coef33) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue33 += (notes[key].coef33 * notes[key].note[i])/notes[key].note.length;
                    
                }
            }
            if (notes[key].coef34) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue34 += (notes[key].coef34 * notes[key].note[i])/notes[key].note.length;
                    
                }
            }
            if (notes[key].coef35) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue35 += (notes[key].coef35 * notes[key].note[i])/notes[key].note.length;
                    
                }
            }
            if (notes[key].coef36) {
                for (let i = 0; i < notes[key].note.length; i++) {
                    ue36 += (notes[key].coef36 * notes[key].note[i])/notes[key].note.length;
                    
                }
            }
            
        }
        ue31 = (ue31/100).toFixed(2);
        ue32 = (ue32/100).toFixed(2);
        ue33 = (ue33/100).toFixed(2);
        ue34 = (ue34/100).toFixed(2);
        ue35 = (ue35/100).toFixed(2);
        ue36 = (ue36/100).toFixed(2);

        setNotesUE(res => [ue31,ue32,ue33,ue34,ue35,ue36]);

    }

    useEffect(() => {
        calcul();
        console.log("Subjects");
    }, [])

    return (
        <div id="divSubjects">
            <div>
                <div style={{backgroundColor: notesUE[0]>=6? 'green': '#b51a1a'}}><p>UE 3.1:</p> {notesUE[0]} /12</div>
                <div style={{backgroundColor: notesUE[1]>=6? 'green': '#b51a1a'}}><p>UE 3.2:</p> {notesUE[1]} /12</div>
                <div style={{backgroundColor: notesUE[2]>=6? 'green': '#b51a1a'}}><p>UE 3.3:</p> {notesUE[2]} /12</div>
                <div style={{backgroundColor: notesUE[3]>=6? 'green': '#b51a1a'}}><p>UE 3.4:</p> {notesUE[3]} /12</div>
                <div style={{backgroundColor: notesUE[4]>=6? 'green': '#b51a1a'}}><p>UE 3.5:</p> {notesUE[4]} /12</div>
                <div style={{backgroundColor: notesUE[5]>=6? 'green': '#b51a1a'}}><p>UE 3.6:</p> {notesUE[5]} /12</div>
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
