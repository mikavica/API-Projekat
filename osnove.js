async function sacuvajUBazu() {
    console.log("sacuvao u bazy")
}

async function saberi(broj1,broj2){
    console.log(1)
    await sacuvajUBazu()
    console.log(2)
    console.log(3)
}

// 1
// sacuvao u bazu
// 2
// 3



let ime="luka"
if(ime==="luka"){

}
ime="marko"




const varijabla =1
console.log(varijabla)


// dobro
return res.status(404).json("not found")

// nec
return res.json("not found");
return res.status(404)


class Torta {
    dodajSlag(){
        return this
    }

    dodajSecer(){
        return this
    }

    dodajKrem(){
        return this
    }
}

const torta = new Torta();
torta.slag = 10
torta.secer = 10
torta.krem = 10;
torta.dodajKrem().dodajSecer().dodajSlag()

class Res {
    _status = 200;
    _message = 'default message'

    status(broj) {
        if (broj < 100 || broj > 600) {
            throw new Error("ne moze")
        }
        this._status = broj
        return this
    }

    json(message) {
        this._message = message
        return this
    }
}

const res = new Res()

res._status = 53185123
res._message = "uspeo"

res.status(1000).json("uspeo")

let a = 1
let b = 2

a = b