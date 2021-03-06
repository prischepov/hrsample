import { firebaseAuth, firebaseConfig } from './../../config/firebase';
import { Vacancy } from './../../models/Vacancy';
import axios from 'axios';
import { Employee } from '../../models/Employee';
import { EmployeeStatus } from '../../models/Enums';


axios.defaults.baseURL = firebaseConfig.databaseURL;

const Auth = {
    signIn: (email: string, password: string) => firebaseAuth.signInWithEmailAndPassword(email, password),
    signOut: () => firebaseAuth.signOut()
}

const Personnel = {
    list: async () => {
        const response = await axios.get('/employees.json');
        const employees = [] as Employee[];
        for(let key in response.data){
            employees.push({...response.data[key], id: key});
        }
        return employees;
    },
    patchEmployeeStatus: async(id: string) =>  await axios.patch(`/employees/${id}/.json`, {status: EmployeeStatus.Leaving})
}

const Vacancies = {
    list: async () => {
        const response = await axios.get('/vacancies.json');
        const vacancies = [] as Vacancy[];
        for(let key in response.data){
            vacancies.push({...response.data[key], id: key});
        }
        return vacancies;
    },
    details: async (id: string) => {
        const response = await axios.get<Vacancy>(`/vacancies/${id}/.json`);
        return {...response.data, id: id} as Vacancy;
    },
    create: (vacancy: Vacancy) => axios.post('/vacancies.json', vacancy),
    edit: (vacancy: Vacancy) => axios.put(`/vacancies/${vacancy.id}/.json`, vacancy),
    close: (vacancy: Vacancy) => {
        axios.patch(`/vacancies/${vacancy.id}/.json`, {
            isClosed: true,
            closureReason: vacancy.closureReason, 
            closedTimestamp: vacancy.closedTimestamp
        })
    },
    delete: (id: string) => axios.delete(`/vacancies/${id}/.json`)
}

const client = {
    Auth,
    Personnel,
    Vacancies
}

export default client;