
import { useState, useCallback } from 'react'
import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from 'react-icons/fa'
import api from '../../services/api';

export default function Main() {

   const [newRepo, setNewRepo] = useState('')
   const [repositorios, setRepositorios] = useState([])


   const handleSubmit = useCallback((e) => {
      e.preventDefault()

      async function submit() {
         const response = await api.get(`repos/${newRepo}`)
         const data = { name: response.data.full_name }
         await setRepositorios([...repositorios, data])
         setNewRepo('')
      }
      submit()
   }, [newRepo, repositorios])

   return <Container>
      <h1>
         <FaGithub size={25} />
         Meus Repositorios
      </h1>
      <Form onSubmit={handleSubmit}>
         <input
            type="text"
            placeholder="Adicionar Repositorio"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
         />
         <SubmitButton>
            <FaPlus color="#fff" size={14} ></FaPlus>
         </SubmitButton>
      </Form>
   </Container>
}