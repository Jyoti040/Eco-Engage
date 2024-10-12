import React , {useContext , useState , useEffect} from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function AuthProvider({children}){
    const [isUser ,setIsUser] = useState(false)
    const [user ,setUser] = useState({})
    const [isOrganisation , setIsOrganisation] = useState(false)
    const [organisation , setOrganisation] = useState({})
    const [loading, setLoading] = useState(true);

    const url = 'auth/current-user'

    useEffect(
        ()=>{
             axios.get(`${BACKEND_URL}${url}`,{ withCredentials: true })
            .then((res)=>{
                console.log('in ccontext index',res)
                if(res.data.isUser === true){
                    setIsUser(true)
                    setIsOrganisation(false)
                    setUser(res.data.user)
                }else{
                    console.log(res.data)
                    setIsOrganisation(true)
                    setIsUser(false)
                    setOrganisation(res.data.organisation)
                }
                setLoading(false)
            })
            .catch((err)=>{
                setIsUser(false);
                setIsOrganisation(false);
                setLoading(false);
            })
           
        },[]
    )


    const initialiseUser = (user) => {
        setIsUser(true);
        setIsOrganisation(false);
        setUser(user);
      };
    
      const initialiseOrganisation = (org) => {
        setIsOrganisation(true);
        setIsUser(false);
        setOrganisation(org);
      };

    const value = {
         setUser , setOrganisation , setIsOrganisation ,setIsUser , isUser , isOrganisation , user , organisation , initialiseUser , initialiseOrganisation , loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}   