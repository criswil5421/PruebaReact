import { menuApi } from '../../api/layoutApi';



  export const fetchListmenu = () => {
    return async () => {

        const response = await menuApi();
        if(response.ok){
          await listMenuAction(response.data)
        }else{
          console.log("ocurrio un error")
        
    } 
  }
}



  export const listMenuAction = (content={}) =>  ({
    payload: {
      content
    }
  })