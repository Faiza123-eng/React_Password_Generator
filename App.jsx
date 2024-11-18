import {useCallback, useState ,useEffect,useRef} from 'react'
chatgpt.askGPT("Explain this code")

//using useRef to relate input field wth copy button
function App() {
  const [length, setLength] = useState(8)
  const [number,setNumber]=useState(false);
  const [character,setCharacter]=useState(false);
  const [password,setPassword]=useState("")
 //useRef hook
 const passwordRef=useRef()//can give default ref as well
  const passGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz"
    if(number) str+="0123456789"
    if(character) str+="!@#$%^&*-_+={}[]~`"
    
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)//concatinating every character after generation
    }
    setPassword(pass)
  }
  //if u will use password here in dependencies it will keep change
  ,[length,number,character,setPassword])//useCallBack is hook use to keep call in cashe and use as much you want
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()//to show user that text is copied
    passwordRef.current?.setSelectionRange(0,99)//to copy particular value
    window.navigator.clipboard.writeText(password)
  },
  [password])
  useEffect(()=>{passGenerator()},[length,number,character,passGenerator])//help to synchronize the process affect
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500' >
       <h1 className='text-white text-center my-3'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type="range"
            min={6} 
            max={100}
            value={length}
            className='cursor-point'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
            <div className='flex item-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={()=>{
                setNumber((prev)=>!prev);
              }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex item-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={()=>{
                setCharacter((prev)=>!prev);
              }}
              />
              <label htmlFor='characterInput'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
