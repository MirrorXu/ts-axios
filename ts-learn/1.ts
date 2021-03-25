// const bol:boolean = false
// const bol1:boolean = true
// const bol2:boolean = 3
// const bol3:boolean = 'wewe'



// const str1:string = 'dsf'
// const str2:string = "dsfsfs"
// const str3:string = `dsfsfs${str1}`


// const arr: number[] = [1,2]
// const arr1: Array<number> = [1,2]


// let x:[number ,string] = [1,'dfs']
// x[1].toUpperCase()
// x[0] = 4534
// x[0] = 'sdfs'



// let label = { size:'10' , label:'label text'}
// function logLable( labelObj: { label:string }){
//   console.log( labelObj.label );
// }
// logLable(label)


// interface IobjWithLabel {
//   label:string
// }
// function logLabel(labelObj: IobjWithLabel) {
//   console.log(labelObj.label)
// }
// logLabel( {label:'dsss'} )
// logLabel( {label:1234} )



interface  square{
  color?:string ,
  area: number
}

interface squareConfig{
  color?:string,
  width: number
}

function createSquare(config:squareConfig):square{
  // let default =
  return {
    area: config.width * config.width,
    color:config.color
  }
}


let myAdd: (x: number, y: number) => number =
  function (x: number, y: number): number { return x + y; };

  console.log(myAdd(12,12));
