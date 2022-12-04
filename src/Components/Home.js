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
    {id:3.01, subj: "Initiation au développement", note: [12,24]},
    {id:3.02, subj: "Développement d'interfaces web", note: [34]},
    {id:3.03, subj: "Développement orienté objets", note: [34]},
    {id:3.04, subj: "Développement d'applications avec IHM", note: [34]},
    {id:3.05, subj: "Qualité de developpement", note: [34]},
    {id:3.06, subj: "Anglais technique", note: [34]},
    {id:3.07, subj: "Bases de la communication", note: [34]},
    {id:3.08, subj: "Introduction à l'rchitecture des ordinateurs", note: [34]},
    {id:3.09, subj: "Intro. aux syst. d'expl.", note: [34]},
    {id:3.10, subj: "Mathématiques discrètes", note: [34]},
    {id:3.11, subj: "Outils mathématiques fondamentaux", note: [34]},
    {id:3.12, subj: "Comm et fonctionnment bas niveau", note: [34]},
    {id:3.13, subj: "Graphes", note: [34]},
    {id:3.14, subj: "Méthodes Numériques", note: [34]},
    {id:3.15, subj: "Introduction aux services réseaux", note: [34]},
    {id:3.16, subj: "Introduction aux base de données et SQL", note: [34]},
    {id:3.17, subj: "Economie durable et numérique", note: [34]},
    {id:3.18, subj: "Exploitation d'une base de données", note: [34]},
    {id:3.19, subj: "Outils numériques pour les statistiques desc", note: [34]},
    {id:3.20, subj: "Gestion de projet et des organisations", note: [34]},
    {id:3.21, subj: "Projet professionnel et personnel", note: [34]},
    {id:3.22, subj: "Droit des contrats et du numérique", note: [34]},
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
    setArrayNotes(Ressources);
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