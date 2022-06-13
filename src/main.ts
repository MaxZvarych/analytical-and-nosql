import { OutputDataStrategy, ShelterAnimalContent } from "./OutputDataStrategy";
import axios from "axios"
import ConsoleStrategy from "./ConsoleStrategy";
import KafkaStrategy from "./KafkaStrategy";
import 'dotenv/config'

const requestDataUrl= 'https://www.dallasopendata.com/resource/7h2m-3um5.json'

interface StrategyRunner {
    getData: ()=> Promise<void>;
    data: ShelterAnimalContent[];
    outputter:OutputDataStrategy;
}

export default class OutputStrategyRunner implements StrategyRunner{
    data: ShelterAnimalContent[];    
    outputter:OutputDataStrategy;
    constructor() {
        this.data = [];
        console.log(process.env.STRATEGY_TYPE==="console", process.env.STRATEGY_TYPE)
        this.outputter=process.env.STRATEGY_TYPE==="console"?new ConsoleStrategy(this.data):new KafkaStrategy(this.data)
    }
    public async getData( ):Promise<void> {
         try {
            const { data } = await axios.get(requestDataUrl)
            this.data= data.slice(0,10);
            this.outputter=process.env.STRATEGY_TYPE==="console"?new ConsoleStrategy(data.slice(0,5)):new KafkaStrategy(data.slice(0,5))

          } catch (error) {
            console.log('Error fetching animals ', error)
          }
    }

    public async outputSpecificStrategy( ):Promise<void> {
        console.log(process.env.STRATEGY_TYPE)
        console.log(this.outputter)
        this.outputter.output();
        
   }
}

const strategyRunner = new OutputStrategyRunner();
strategyRunner.getData().then(()=>strategyRunner.outputSpecificStrategy());

