//Context, Reducer (cara que executa ações específicas), Provider (ambiente dos dados do contexto), Hook (simplifica o processo ao acesso das informações)
import {createContext, ReactNode, useContext, useReducer} from 'react';

type State = {                              // type dos dados armazenados (logo, state: State)
    currentStep: number;
    name: string;
    level: 0 | 1;
    email: string;
    github: string;
}                            

type Action = {
    type: FormActions;      //meu formAction (apenas as opções do meu enum)
    payLoad: any;           // usamos any pra tipar o payload porque meus dados podem vir de qualquer coisa
}

type ContextType = {         //vamos usar no meu createContext
    state: State;
    dispatch: (action: Action)=> void; // tipamos a função dispatch e declaramos que ela n retorna nada por padrão
}

type FormProviderProps = {
    children: ReactNode;
}


const initialData: State = {               // initial dada recebe o type State
    currentStep: 0,
    name: '',
    level: 0,
    email: '',
    github: ''

}
//Context 
const FormContext = createContext<ContextType | undefined>(undefined); //meu Contexto começa ou com undefined ou com meu ContextType

//Reducer
export enum FormActions{ //Enums são uma funcionalidade adicionada ao JavaScript pelo TypeScript na qual facilita o manuseio de grupos de constantes nomeadas. Por padrão um enum é baseado em números, começando no zero, e para cada opção é assinalado um número incrementado por um. Isso é útil quando o valor em si não importa.
    setCurrentStep,
    setName,
    setLevel,
    setEmail,
    setGithub,
}
const formReducer = (state: State, action: Action)=>{ //funcao que recebe: state (dados) e action (acao que executa nossos dados). state: State (State informa o type dos meus dados)
    switch(action.type){               //precisam de tipagem - switch - ver qual é a ação necessária (tipo)
        case FormActions.setCurrentStep: //case é um tipo de ação que evoca o enum {} e linka com uma ação ()
            return{
                ...state, currentStep: action.payLoad   //payload: dados 
            }; // a func. formReducer recebe os dados com state, executa a ação de trocar o passo atual (FormActions.setCurrentStep)
            //pega o passo atual com action.payload, troca no currentStep e retorna um NOVO STATE (...state) com o currentStep modificado pelo switch
        case FormActions.setName: 
            return{
                ...state, name: action.payLoad   //payload: dados 
            };
        case FormActions.setLevel: 
            return{
                ...state, level: action.payLoad   //payload: dados 
            };
        case FormActions.setEmail: 
            return{
                ...state, email: action.payLoad   //payload: dados 
            };
        case FormActions.setGithub: 
            return{
                ...state, github: action.payLoad   //payload: dados 
            };
        default:
            return state;
    } 
};

//Provider - ambiente geral p gerenciamento de dados global

export const FormProvider = ({children}: FormProviderProps)=>{  //cpt principal da aplicação 
    const [state, dispatch] = useReducer(formReducer, initialData); //uso padrao de um reducer. state: dados e dispatch: função que executa minhas ações
    const value = {state, dispatch}; 
    return(
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>  //cria o ambiente e coloca o site inteiro dentro do Provider
    );
}

// context hook

export const useForm = ()=>{
    const context = useContext(FormContext);
    if (context === undefined){ //se sim, significa que estou usando um componente fora do Provider
        throw new Error('useForm tem que ser usado dentro do FormProvider');
    }
    return context;
}