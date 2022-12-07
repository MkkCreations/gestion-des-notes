import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/authContext'
import Subjects from './Subjects';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
import { app } from '../firebase';


function Home() {
  const {user, logout, loading} = useAuth();
  const [arrayNotes, setArrayNotes] = useState(null);

  const firestore = getFirestore(app)

  const handleLogOut = async () => {
    await logout();
  }

  const Ressources = [
    {id:3.01, subj: "Initiation au développement", note: [], coef31:21, coef32:12},
    {id:3.02, subj: "Développement d'interfaces web", note: [], coef31:6, coef35:9, coef36: 2.5},
    {id:3.03, subj: "Développement orienté objets", note: [], coef31:10.5, coef32:7.5},
    {id:3.04, subj: "Développement d'applications avec IHM", note: [], coef31:10.5, coef35:1.5, coef36: 2},
    {id:3.05, subj: "Qualité de developpement", note: [], coef31: 6, coef35: 3},
    {id:3.06, subj: "Anglais technique", note: [], coef31: 3, coef33: 9, coef34: 3, coef35: 3, coef36: 14},
    {id:3.07, subj: "Bases de la communication", note: [], coef31: 3, coef33: 4.5, coef35: 12, coef36: 11},
    {id:3.08, subj: "Introduction à l'rchitecture des ordinateurs", note: [], coef32: 1.5, coef33: 10.5},
    {id:3.09, subj: "Intro. aux syst. d'expl.", note: [], coef32: 1.5, coef33: 10.5},
    {id:3.10, subj: "Mathématiques discrètes", note: [], coef32: 7.5, coef34: 9},
    {id:3.11, subj: "Outils mathématiques fondamentaux", note: [], coef32: 7.5},
    {id:3.12, subj: "Comm et fonctionnment bas niveau", note: [], coef32: 6, coef33: 18},
    {id:3.13, subj: "Graphes", note: [], coef32: 10.5, coef35: 3},
    {id:3.14, subj: "Méthodes Numériques", note: [], coef32: 6},
    {id:3.15, subj: "Introduction aux services réseaux", note: [], coef33: 7.5},
    {id:3.16, subj: "Introduction aux base de données et SQL", note: [], coef34: 18},
    {id:3.17, subj: "Economie durable et numérique", note: [], coef34: 3, coef36: 5.5},
    {id:3.18, subj: "Exploitation d'une base de données", note: [], coef34: 15},
    {id:3.19, subj: "Outils numériques pour les statistiques desc", note: [], coef34: 6},
    {id:3.20, subj: "Gestion de projet et des organisations", note: [], coef34: 6, coef35: 28.5, coef36: 5.5},
    {id:3.21, subj: "Projet professionnel et personnel", note: [], coef36: 11},
    {id:3.22, subj: "Droit des contrats et du numérique", note: [], coef36: 8.5},
  ]

  async function userData(iduser) {
    const docuRef = doc(firestore, `users/${iduser}`);
    const consulta = await getDoc(docuRef);

    if(consulta.exists()) {
      const infoDoc = consulta.data();
      return infoDoc.Ressources;
    } else{
      await setDoc(docuRef, {Ressources: [...Ressources]});
      const consulta = await getDoc(docuRef);
      const infoDoc = consulta.data();
      return infoDoc.Ressources;
    }
    
  }
  
  useEffect(() => {
    /* setArrayNotes(Ressources); */
    async function fetchNotes() {
      const notesFetched = await userData(user.email);
      setArrayNotes(notesFetched);
    }
    fetchNotes();
    
  }, [])

  if(loading) return <h1>Loading</h1>
  return (
    <div id='divHome'>
      <nav>
        <h2>Welcome {user.email}</h2>
        <button onClick={handleLogOut}>logout</button>
      </nav>
      {
        arrayNotes ?
        <Subjects notes={arrayNotes} setArrayNotes={setArrayNotes} email={user.email} userData={userData} />
        : null
      }
    </div>
  )
}

export default Home