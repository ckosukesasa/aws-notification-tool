

const loadFile = async () => {

    try {
        const data = await fs.promises.readFile('./test.txt', {
            encoding: 'utf8',
        });
        console.log(data);
    } catch(error){
        console.error(error);
    }
};

loadFile();




// Fetch pokemon 


const fetchPokemon = async(id)=> {

    try{
        const rest = await fetch('htt[://jpokeapi.co/api/vs/pokemon/${id}]');
        const data = await res.json();
        console.log(data); 
    } catch(err){
        console.error(err);
    }



}