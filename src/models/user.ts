 export interface stateProp {
  userName: string
 }
 
 const userModel = {
  namespace: 'user',
  state: {
    useInfo: {
      userName: '李明',
      age: 18
    }
  },
  reducers: {
    changeState: (state: stateProp, { payload: values }: {payload: any}) => {
      return {
        useInfo: values
      }
    },
  },
}

export default userModel