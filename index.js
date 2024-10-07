import express from 'express'

const app =express()
const port = 3000
app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send("Hello from kunal and this is my code ")
// })
// app.get('/about-me',(req,res)=>{
//     res.send("I'mm learning express.js ")
// })
// app.get('/twitter',(req,res)=>{
//     res.send("kunalgupta23")
// })


let teadata =[]
let nextId=1
//add new tea
app.post('/teas',(req,res)=>{
    
    const {name,price}= req.body
    const newTea={id:nextId++, name,price }
    teadata.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teadata)
    
    
})
//get a tea with id 
app.get('/teas/:id',(req,res)=>{
   const tea = (teadata.find(t=> t.id===parseInt(req.params.id)))
   if(!tea){
    res.status(404).send('Tea not found')
} 
else{
    res.status(200).send(tea)
}
})

//update tea
app.put('/teas/:id',(req,res)=>{
  
  const tea= teadata.find(t=>t.id===parseInt(req.params.id))
   
  if(!tea)
  {
  return  res.status(404).send('cant find the mentioned tea ')
  }
  const {name,price}=req.body
  tea.name=name
  tea.price=price
  res.status(200).send(tea)
})

//delete tea
app.delete('/teas/:id',(req,res)=>{
   const index= teadata.findIndex(t=> t.id===parseInt(req.params.id))
   if(index===-1){
    return res.status(404).send("tea not found")
   }
   teadata.splice(index,1)
    res.status(200).send('deleted')
})



app.listen(port,()=>{
    console.log(`Server is running at ${port}...`);
    
})