 export interface stateProp {
  update: string
 }
 
 const projectModel = {
  namespace: 'project',
  state: {
    update: ''
  },
  reducers: {
    changeState: (state: stateProp, { payload: name }: {payload: {name: string}}) => {
      return {
        update: name
      }
    },
  },
}

export default projectModel